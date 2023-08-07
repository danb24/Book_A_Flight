const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public')) 
const {tlvflight}= require('./model/mongoDB')

app.post('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})


app.get('/flights', async (req, res) => {
  const flights = await tlvflight()
  res.json(flights)
})
