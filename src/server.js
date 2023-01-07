const express = require('express')
const app = express();
var cors = require('cors')

const axios = require('axios');

const port = 3001
app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/companies/:name', function (req, response, next) {
  const companyName = req.params.name;
  let companies = "";
  axios.get(`https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=${companyName}&token=7e2d094d741eb56c885f7acacc0ab0a7`).then((res) => {
    companies = res.data;
    response.json(companies);
  }).catch(err => {
    console.error(err);
  })
})

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port ', port)
});