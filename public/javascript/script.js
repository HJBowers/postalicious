const populateRequest = () => {
  const formElements = document.mainform.elements
  let elementValuesObject = {}

  for (let element of formElements){
    elementValuesObject[element.name] = element.value
  }

  let requestMethodHost = `${elementValuesObject.method} / HTTP/1.1 <br>
Host: ${elementValuesObject.host}`

  let requestHeader = ``

  if (elementValuesObject.header_key1) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key1}: ${elementValuesObject.header_value1}<br>`
  }

  if (elementValuesObject.header_key2) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key2}: ${elementValuesObject.header_value2}<br>`
  }

  if (elementValuesObject.header_key3) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key3}: ${elementValuesObject.header_value3}<br>`
  }

  let requestQuery = ``

  if (elementValuesObject.key1) {
    requestQuery +=
      `${elementValuesObject.key1}=${elementValuesObject.value1}`
  }

  if (elementValuesObject.key2) {
    requestQuery +=
      `&${elementValuesObject.key2}=${elementValuesObject.value2}`
  }

  if (elementValuesObject.key3) {
    requestQuery +=
      `&${elementValuesObject.key3}=${elementValuesObject.value3}`
  }

  let requestBody = ``

  if (elementValuesObject.input_body) {
    requestBody += `${elementValuesObject.input_body}`
  }

  let requestQueryEncoded = encodeURI(requestQuery)

  //WIP
  let requestHTMLified = requestMethodHost + "<br>" + requestHeader + "<br>" + requestQueryEncoded + requestBody

  document.getElementById("request-container").innerHTML = requestHTMLified
}

const populateResponse = () => {
  let responseHeaders = []
  let responseHeaderValues = []
  let status
  let statusText

  const formElements = document.mainform.elements
  let elementValuesObject = {}

  for (let element of formElements){
    elementValuesObject[element.name] = element.value
  }

  const myHeaders = new Headers()
  if (elementValuesObject.header_key1) {
    myHeaders.append(elementValuesObject.header_key1, elementValuesObject.header_value1)
  }
  if (elementValuesObject.header_key2){
    myHeaders.append(elementValuesObject.header_key2, elementValuesObject.header_value2)
  }
  if (elementValuesObject.header_key3) {
    myHeaders.append(elementValuesObject.header_key3, elementValuesObject.header_value3)
  }

  const myInit = {
    method: elementValuesObject.method,
    headers: myHeaders,
  }

  let requestQuery = ''

  if (elementValuesObject.key1) {
    requestQuery += "?" +
      encodeURIComponent(elementValuesObject.key1) +
      "="+ encodeURIComponent(elementValuesObject.value1)
  }
  if (elementValuesObject.key2) {
    requestQuery += "&" +
      encodeURIComponent(elementValuesObject.key2) +
      "="+ encodeURIComponent(elementValuesObject.value2)
  }
  if (elementValuesObject.key3) {
    requestQuery += "&" +
      encodeURIComponent(elementValuesObject.key3) +
      "="+ encodeURIComponent(elementValuesObject.value3)
  }

  let url = elementValuesObject.host + requestQuery

  const myRequest = new Request(url, myInit)

  function readAllChunks(readableStream) {
    const reader = readableStream.getReader();
    const chunks = [];

    return pump();

    function pump() {
      return reader.read().then(({ value, done }) => {
        if (done) {
          return chunks;
        }

        chunks.push(value);
        return pump();
      });
    }
  }

  fetch(myRequest)
    .then(response => {
      for (let key of response.headers.keys()) {
        responseHeaders.push(key)
      }
      for (let value of response.headers.values()) {
        responseHeaderValues.push(value)
      }
      status = response.status
      statusText = response.statusText


      return readAllChunks(response.body)
    })
    .then(result => {
      let responseBody = new TextDecoder("utf-8").decode(result[0])
      return responseBody
    })
    .then(body => {
      contentLength = body.length
      let responseHeadersAndValues = []
      responseHeaders.forEach((element, index) => {
        responseHeadersAndValues.push(element.replace(/\b\w/g, l => l.toUpperCase()))
        responseHeadersAndValues.push(": ")
        responseHeadersAndValues.push(responseHeaderValues[index])
        responseHeadersAndValues.push("\n")
      })

      let container = document.getElementById("response-container")
      container.innerText = "HTTP/1.1 " + status + " " + statusText + "\n" +
        responseHeadersAndValues.join('') + "\n" +  body
    })

}
