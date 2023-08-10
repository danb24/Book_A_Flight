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

const login = async (username,password) => {
  const client = new MongoClient(uri,{useUnifiedTopology: true});

  try{
      await client.connect();
      console.log('connect');
      const database = client.db('flight_project');
      const collection = database.collection('users');
      const user = await collection.findOne({ username: username, password: password });

    if (user) {
      // Check the role of the user and return corresponding value
      if (user.role === 'manager') {
        console.log('manager')
        return 1;
      } else if (user.role === 'customer') {
        console.log('customer')
        return 2;
      }
    }
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


const createUser = async (id, username, password, role, phone, first_name, last_name) => {
  const database = client.db('flight_project');
  const collection = database.collection('users');

  // Check if username and id are unique
  const existingUser = await collection.findOne({ $or: [{ username: username }, { id: id }] });
  if (existingUser) {
    throw new Error('Username or ID already exists');
  }

  // Create a new user document
  const newUser = {
    id: id,
    username: username,
    password: password,
    role: role,
    phone: phone,
    first_name: first_name,
    last_name: last_name
  };

  // Insert the new user document
  try {
    const result = await collection.insertOne(newUser);
    console.log('User inserted:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw new Error('Failed to insert user');
  }
};

const deleteUser = async (username, id) => {
  const database = client.db('flight_project');
  const collection = database.collection('users');

  // Delete the user based on the combination of username and id
  try {
    const result = await collection.deleteOne({ username: username, id: id });
    if (result.deletedCount === 1) {
      console.log('User deleted:', username);
      return true; // User deleted successfully
    } else {
      console.log('User not found:', username);
      return false; // User not found
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};


const getAllReviews = async () => {
  const database = client.db('flight_project');
  const collection = database.collection('reviews');

  try {
    const reviews = await collection.find().toArray();
    console.log('All reviews fetched:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};

async function insertReview(destination, description, rating, commenter) {
  try {
    const database = client.db('flight_project');
    const collection = database.collection('reviews');

    const newReview = {
      destination: destination,
      description: description,
      rating: rating,
      commenter: commenter
    };

    const result = await collection.insertOne(newReview);
    console.log('Inserted review with ID:', result.insertedId);
  } catch (error) {
    console.error('Error inserting review:', error);
  }
}

const insertFlight = async (flight_number, from, dest, date, price,
  company) => {
    try {

      console.log('Connected to the database');
      console.log(flight_number, from, dest, date, price, company)
      await client.connect()
      const database = await client.db('flight_project');
      const collection = await database.collection('flights');
  
      // Create a new flight document
      const newFlight = {
        flight_number: flight_number,
        from: from,
        dest: dest,
        date: date,
        price: price,
        company: company
      };
  
      // Insert the new flight document
      const result = await collection.insertOne(newFlight);
      console.log('Inserted flight:', result.insertedId);
  
      return {result:result.insertedId, IsSuccess:true};
    } catch (error) {
      console.error('Error:', error);
      return {IsSuccess:false}

    }
  };
  

// Example usage


module.exports={
  allflights,login,filterFlightsByCriteria, createUser, deleteUser, insertReview, getAllReviews, insertFlight
}
