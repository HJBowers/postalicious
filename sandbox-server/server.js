const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.text({
  defaultCharset: 'utf-8',
  type: 'text/plain'
}))

app.get('/', (request, response) => {
  response.status(200)
    .type('text/plain')
      .send('Welcome to Sandbox!')
})

app.get('/search', (request, response) => {
  if(request.query.q) {
    response.status(200)
      .type('text/plain')
        .send('You searched for: \"' + request.query.q + '\"')
  }
  response.status(400)
    .type('text/plain')
      .send('You didn\'t provide a search query term \:\(')
})

app.post('/things', (request, response) => {
  response.status(201)
    .type('text/plain')
      .send('New thing created: \"' + request.body + '\"!')
})

app.get('/somefile', (request, res) => {
  console.log(response.format)
  response.format({
    text: () => {
      response.status(200)
        .send('This is a plain text file')
    },
    html: () => {
      response.status(200)
        .send('<!DOCTYPE html><html><body>This is an HTML file</body></html>')
    },
    default: () => {
      response.status(406)
        .send('Not Acceptable')
    }
  })
})

const server = app.listen(3000, () => {
  console.log("Listening on port", server.address().port)
})
