const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/shipmnts'; // Use IPv4 address

const connectToDatabase = async() => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected successfully to MongoDB using Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB using Mongoose:', error);
        process.exit(1);
    }
};

// Example usage
connectToDatabase();

module.exports = mongoose;