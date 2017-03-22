const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

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

app.get('/somefile', (request, response) => {
  console.log(response.format)
  response.format({
    text: () => {
      response.status(200)
        .type('text/plain')
          .send('This is a plain text file')
    },
    html: () => {
      response.status(200)
        .type('text/html')
          .send('<!DOCTYPE html><html><body>This is an HTML file</body></html>')
    },
    default: () => {
      response.status(406)
        .send('Not Acceptable')
    }
  })
})

app.get('/myjsondata', (request, response) => {
  response.format({
    json: () => {
      response.status(200)
        .type('application/json')
          .send({"title": "some JSON data"})
    },
    default: () => {
      response.status(406)
        .send('Not Acceptable')
    }
  })
})

app.get('/old-page', (request, response) => {
  response.status(301)
  response.location('localhost:3000/newpage');
})

app.post('/admin-only', (request, response) => {
  response.status(403)
  .send('Not Authorized')
})

app.get('/not-a-page', (request, response) => {
  response.status(404)
  .send('Page Not Found')
})

app.get('/server-error', (request, response) => {
  response.status(500)
  .send('Server Error')
})

const server = app.listen(3000, () => {
  console.log("Listening on port", server.address().port)
})
