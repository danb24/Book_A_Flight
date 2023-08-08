const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public')) 
const {allflights}= require('./model/mongoDB')

app.post('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})


app.get('/flights', async (req, res) => {
  const flights = await allflights()
  res.json(flights)
})

app.get('/flights/:from/:dest', async (req, res) => {
  const from = req.params.from;
  const dest = req.params.dest;
  const flights = await mongoDB.findFlights({ from, dest });
  res.json(flights);})
