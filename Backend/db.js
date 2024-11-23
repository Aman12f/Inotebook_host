// const mongoose = require('mongoose');
// // const mongoURI =  "mongodb://localhost:27017/inotebook_1"
// // const mongoURI =  "mongodb+srv://amanmotghare2024:GnxhBuWlhAGrA1F8@inotebook-assessment.bcu40.mongodb.net/?retryWrites=true&w=majority&appName=inotebook-assessment"
// const mongoURI =  "mongodb+srv://amanmotghare2024:GnxhBuWlhAGrA1F8@inotebook-assessment.bcu40.mongodb.net/?retryWrites=true&w=majority&appName=inotebook-assessment"

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to Mongo successfully");
//       } catch (error) {
//         console.error("Error connecting to Mongo:", error);
//       }
//   };
// module.exports = connectToMongo;

// // amanmotghare2024
// // GnxhBuWlhAGrA1F8


const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://amanmotghare2024:GnxhBuWlhAGrA1F8@inotebook-assessment.bcu40.mongodb.net/inotebook_1?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error.message);
    }
};

module.exports = connectToMongo;
