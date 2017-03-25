const populateRequest = () => {
  const formElements = document.mainform.elements
  let formValues = {}

  for (let element of formElements){
    formValues[element.name] = element.value
  }

  let requestMethodHost = `${formValues.method} / HTTP/1.1 <br>Host: ${formValues.host}`

  let requestHeader = ``
  for (var i = 1; i <= 3; i++) {
    if(formValues[`header_key${i}`]) {
      requestHeader += `${formValues[`header_key${i}`]}: ${formValues[`header_value${i}`]}<br>`
    }
  }

  let requestQuery = ``
  for (var i = 1; i <= 3; i++) {
    if(formValues[`key${i}`]) {
      if(i === 1) {
        requestQuery += `${formValues[`key${i}`]}=${formValues[`value${i}`]}`
      } else {
        requestQuery += `&${formValues[`key${i}`]}=${formValues[`value${i}`]}`
      }
    }
  }

  let requestQueryEncoded = encodeURI(requestQuery)

  let requestHTMLified = requestMethodHost + "<br>" + requestHeader + "<br>" +
    requestQueryEncoded + formValues.input_body

  document.getElementById("request-container").innerHTML = requestHTMLified
}

populateResponse = (formValues) => {
  let responseHeaders = []
  let responseHeaderValues = []
  let status
  let statusText

  // const formElements = document.mainform.elements
  // let formValues = {}
  // for (let element of formElements){
  //   formValues[element.name] = element.value
  // }

  console.log("Here is what's being passed through the function --->", formValues)

  const myHeaders = new Headers()
  for (var i = 1; i <= 3; i++) {
    if (formValues[`header_key${i}`]) {
      myHeaders.append(formValues[`header_key${i}`], formValues[`header_value${i}`])
    }
  }

  const myInit = {
    method: formValues.method,
    headers: myHeaders,
  }

  let requestQuery = ''
  for (var i = 1; i <= 3; i++) {
    if(formValues[`key${i}`]) {
      if (i === 1) {
        requestQuery += "?" +
          encodeURIComponent(formValues[`key${i}`]) +
          "="+ encodeURIComponent(formValues[`value${i}`])
      } else {
        requestQuery += "&" +
          encodeURIComponent(formValues[`key${i}`]) +
          "="+ encodeURIComponent(formValues[`value${i}`])
      }
    }
  }

  let url = formValues.host + requestQuery

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
            responseHeadersAndValues.join('') + "\n" + body
        })

}

module.exports = populateResponse;
