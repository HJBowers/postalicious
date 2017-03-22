const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'html')

// app.use(bodyParser.text({
//   defaultCharset: 'utf-8',
//   type: 'text/plain'
// }))
//
app.use(bodyParser.urlencoded({extended: true}))

app.post('/', (request, response) => {
  response.status(200)
    .type('text/plain')
    console.log(response)
})








const server = app.listen(3001, () =>{
  console.log("Listening on port", server.address().port)
})
