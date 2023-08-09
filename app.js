const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({ extended: true }));

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



app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const loggedIn = await login(username, password);

  if (loggedIn) {
    // The user exists, so redirect them to the home page.
    res.redirect('/client.html');
  } else {
    // The user does not exist, so show an error message.
    res.send('<h1>Error</h1><p>The username or password is incorrect.</p>');
  }
});
