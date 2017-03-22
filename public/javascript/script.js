const populateRequest = () => {
  const formElements = document.mainform.elements
  let elementValuesObject = {}

  for (let element of formElements){
    elementValuesObject[element.name] = element.value
  }

  let requestMethodHost = `${elementValuesObject.method} / HTTP/1.1
Host: ${elementValuesObject.host}
`

  let requestHeader = ``
  if (elementValuesObject.header_key1) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key1}: ${elementValuesObject.header_value1}
`
  }

  if (elementValuesObject.header_key2) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key2}: ${elementValuesObject.header_value2}
`
  }

  if (elementValuesObject.header_key3) {
    requestHeader = requestHeader +
      `${elementValuesObject.header_key3}: ${elementValuesObject.header_value3}
`
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

  let request = requestMethodHost + requestHeader + "\n" + requestQueryEncoded + requestBody

  //WIP
  let requestHTMLified = "<b>" + requestMethodHost + "</b><br>" + requestHeader + "<br><br>" + requestQueryEncoded + requestBody

  document.getElementById("request-container").innerHTML = requestHTMLified
}
