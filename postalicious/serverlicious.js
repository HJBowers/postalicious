const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')
const app = express()
const populateResponse = require('../public/javascript/script')


app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({extended: true}))

// let options = {
//   host:'localhost',
//   path: '/'
// }
//
// var req = http.get(options, function(res){
//   console.log("status:", res.statusCode)
//   console.log("headers:", JSON.stringify(res.headers))
//
//   let bodyChunks = []
//   res.on('data', function(chunk) {
//     bodyChunks.push(chunk)
//
//   }).on('end', function () {
//     let body = Buffer.concat(bodyChunks);
//     console.log('Body:' + body);
//   })
// });
//
// req.on('error', function(e){
//   console.log('error:' + e.message);
// });


app.get('/sendrequest', (request, response) => {
  // response.render('../javascript/index.html')
  console.log("route is being called")
  console.log(response)
  console.log(request.query)
  populateResponse(request.query)
  response.status(200)
    .type('text/plain')
        .redirect('index.html')
})

const server = app.listen(3001, () =>{
  console.log("Listening on port", server.address().port)
})
