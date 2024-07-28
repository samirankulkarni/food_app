const mongoose = require('mongoose');

// Update the URI to connect to your local MongoDB instance
const mongoURI = "mongodb+srv://samiran:Swami$0107@cluster0.dpqmnsc.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"

module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    if (err) {
      console.error("Failed to connect to MongoDB:", err);
      callback(err, null, null);
    } else {
      console.log("Connected to MongoDB");

      try {
        const foodCollection = await mongoose.connection.db.collection("food_items");
        const foodItems = await foodCollection.find({}).toArray();
        console.log(foodItems)

        const categoryCollection = await mongoose.connection.db.collection("Categories");
        const categories = await categoryCollection.find({}).toArray();

        callback(null, foodItems, categories);
      } catch (collectionError) {
        console.error("Error fetching collections:", collectionError);
        callback(collectionError, null, null);
      }
    }
  });
};
