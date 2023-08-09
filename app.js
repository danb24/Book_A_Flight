const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = 3000
app.use(express.static('public')) 
const {allflights,login,filterFlightsByCriteria}= require('./model/mongoDB')

const uri = "mongodb+srv://danuri240595:HSTYlseQRW5ddR42@cluster0.4glz4l5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

connectToMongo();

app.post('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})


app.get('/flights', async (req, res) => {
  const from = req.query.from;
  const dest = req.query.dest;
  const database = client.db('flight_project');
  const collection = database.collection('flights');

  if (from || dest) {
    // Handle filtering flights
    const flights = await filterFlightsByCriteria(from, dest, collection);
    res.json(flights);
  } else {
    // Handle viewing all flights
    const flights = await allflights();
    res.json(flights);
  }
});
