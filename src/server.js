const express = require('express')
const app = express()
var cors = require('cors')

const port = 3001
app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const queryCompanies = async (companyName) => {
    const companies = await axios.get(`https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=${companyName}&token=7e2d094d741eb56c885f7acacc0ab0a7`);
    return companies;
}


app.get('/companies/:name', function (req, res, next) {
  const companyName = req.params.name;
  res.json(queryCompanies(companies));
})


app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
});