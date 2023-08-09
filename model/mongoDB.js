const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://danuri240595:HSTYlseQRW5ddR42@cluster0.4glz4l5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const allflights = async () => {
    const client = new MongoClient(uri,{useUnifiedTopology: true});

    try{
        await client.connect();
        console.log('connect');
        const database = client.db('flight_project');
        const collection = database.collection('flights');
        const flights = await collection.find().toArray();
        console.log(flights);
        return flights;
    } catch (error) {
        console.error('error');
        throw new Error ('faild');
    } finally {
        await client.close();
    }
};

//query to fine if the user is in the database 
const login = async (username,password) => {
  const client = new MongoClient(uri,{useUnifiedTopology: true});

  try{
      await client.connect();
      console.log('connect');
      const database = client.db('flight_project');
      const collection = database.collection('users');
      const user = await collection.find({username:username,password:password}).toArray();
      console.log(user);
      return user.length > 0;
  } catch (error) {
      console.error('error');
      throw new Error ('faild');
  } finally {
      await client.close();
  }
};

const filterFlightsByCriteria = async (from, dest) => {
const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Connected to the database.');
    const database = client.db('flight_project');
    const flightsCollection = database.collection('flights');
    const filter = {};
    if (from) filter.from = from;
    if (dest) filter.dest = dest;

    console.log('Filter:', filter);
    const flights = await flightsCollection.find(filter).toArray();
    console.log('Filtered Flights:', flights);

    return flights;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch filtered flights.');
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

module.exports={
  allflights,login,filterFlightsByCriteria
}


run().catch(console.dir);
