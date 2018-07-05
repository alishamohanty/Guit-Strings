const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  res.send({
    message: ` ${req.body.email} is your email address buddy!!`
  })
})
app.listen(8081, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Server listening to port 8081')
})
