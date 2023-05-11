const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        mongoose.set('strictQuery', true);

        const conn = await mongoose.connect("mongodb+srv://mcsirshad95:AtMFFGwJq8txlNij@lms.yy6o4yl.mongodb.net/lms?retryWrites=true&w=majority");
        mongoose.connect("mongodb://localhost:27017/collectionName", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongooDb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();