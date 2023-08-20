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

// check login
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

//flights querys ==>

// get all flights avalibale 
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


// qery for filtering flights 
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

// manager querys ==>

// creating new user in the system
const createUser = async (id, username, password, role, phone,
  first_name, last_name) => {
    await client.connect()
    const database = client.db('flight_project');
    const collection = database.collection('users');
    // Check if username and id are unique
    const existingUser = await collection.findOne({ $or: [{ username:
  username }, { id: id }] });
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
      return {result:result.insertedId, IsSuccess:true};
    } catch (error) {
      console.error('Error inserting user:', error);
      return {IsSuccess:false}
    }
  };

// manager only : deleating new user in the system 
const deleteUser = async (username, id) => {
  const database = client.db('flight_project');
  const collection = database.collection('users');

  try {
    const result = await collection.deleteOne({ username: username, id: id });
    if (result.deletedCount === 1) {
      console.log('User deleted:', username);
      return {result:result.deletedId, IsSuccess:true}; 
    } else {
      console.log('User not found:', username);
      return true ;
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return {IsSuccess:false};
  }
};

// manager only: Add new flight
const insertFlight = async (flight_number, from, dest, date, price,
  company) => {
    try {
      console.log('Connected to the database');
      console.log(flight_number, from, dest, date, price, company);
      await client.connect();
      const database = await client.db('flight_project');
      const collection = await database.collection('flights');
  
      // Check if the date is in the past
      const currentDate = new Date();
      const flightDate = new Date(date);
  
      if (flightDate < currentDate) {
        console.error('Flight date the past');
        return { IsSuccess: false };
      }
  
      // Check if the flight number is already in the database
      const existingFlight = await collection.findOne({ flight_number:
  flight_number });
  
      if (existingFlight) {
        console.error('Flight number already exists');
        return { IsSuccess: false };
      }
  
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
  
      return { result: result.insertedId, IsSuccess: true };
    } catch (error) {
      console.error('Error:', error);
      return { IsSuccess: false };
    }
  };
// Reviews querys ==>

// get All Reviews
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

// Add new Review
async function insertReview(destination, description, rating, commenter) {
  try {
    await client.connect()
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
    return {result:result.insertedId, IsSuccess:true};
  } catch (error) {
    console.error('Error inserting review:', error);
    return {IsSuccess:false}
  }
}

// filter reviwes 
const filterreviewsByCriteria = async (destination) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
    try {
      console.log('Connecting to the database...');
      await client.connect();
      console.log('Connected to the database.');
      const database = client.db('flight_project');
      const reviewsCollection = database.collection('reviews');
      const filter = {};
      if (destination) filter.destination = destination;
  
      console.log('Filter:', filter);
      const reviews = await reviewsCollection.find(filter).toArray();
      console.log('Filtered reviews:', reviews);
  
      return reviews;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch filtered reviews.');
    } finally {
      await client.close();
      console.log('Database connection closed.');
    }
  };

//discaunts querys == >

// add new discaount
const createCoupon = async (discount, couponcode, coupon_description) => {
  try {
    await client.connect();
    const database = client.db('flight_project');
    const collection = database.collection('coupons');

    // Check if couponCode is already used
    const existingCoupon = await collection.findOne({ couponcode: couponcode });
    if (existingCoupon) {
      console.error('Coupon code already exists');
      return { IsSuccess: false };
    }

    // Create a new coupon document
    const newCoupon = {
      discount: discount,
      couponcode: couponcode,
      coupon_description: coupon_description
    };

    // Insert the new coupon document
    const result = await collection.insertOne(newCoupon);
    console.log('Coupon inserted successfully');
    return { result: result.insertedId, IsSuccess: true };
  } catch (error) {
    console.error('Error inserting coupon:', error);
    return { IsSuccess: false };
  }
};

// see all avalibale coupons
const allcoupons = async () => {
  const client = new MongoClient(uri,{useUnifiedTopology: true});
  
  try{
      await client.connect();
      console.log('connect');
      const database = client.db('flight_project');
      const collection = database.collection('coupons');
      const coupons = await collection.find().toArray();
      console.log(coupons);
      return coupons;
    } catch (error) {
      console.error('error');
      throw new Error ('faild');
    } finally {
      await client.close();
    }
};

// delete coupon 
const deleteCoupon = async (couponcode) => {
  try {
    await client.connect();
    const database = client.db('flight_project');
    const collection = database.collection('coupons');
    const couponToDelete = await collection.findOne({ couponcode: couponcode });
    if (!couponToDelete) {
      console.error('Coupon code not found');
      return { IsSuccess: false };
    }

    // Delete the coupon document
    const deleteResult = await collection.deleteOne({ couponcode: couponcode });
    if (deleteResult.deletedCount === 1) {
      console.log('Coupon deleted successfully');
      return { IsSuccess: true };
    } else {
      console.error('Coupon deletion failed');
      return { IsSuccess: false };
    }
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return { IsSuccess: false };
  } finally {
    await client.close();
  }
};

// to build the chart
async function getUniqueDestinationsWithAverageRatings() {
  try {
      await client.connect();
      const db = client.db('flight_project');
      const reviewsCollection = db.collection('reviews');
      const pipeline = [
          {
              $group: {
                  _id: { $toLower: "$destination" },
                  averageRating: { $avg: { $toDouble: "$rating" } }
              }
          },
          {
              $project: {
                  _id: 0,
                  destination: { $toUpper: "$_id" },
                  averageRating: 1
              }
          },
          {
              $sort: { destination: 1 }
          }
      ];
      const result = await reviewsCollection.aggregate(pipeline).toArray();
      console.log(result)
      return result;
  } catch (error) {
      throw error;
  } 
}



// exporting querys to use in app.js
module.exports={
  run,allflights,login,filterFlightsByCriteria, createUser, deleteUser, insertReview, getAllReviews, insertFlight,filterreviewsByCriteria,
  createCoupon,allcoupons,deleteCoupon,getUniqueDestinationsWithAverageRatings
}
