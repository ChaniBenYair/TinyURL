import mongoose from "mongoose";

const uriLocal = "mongodb://localhost:27017/TinyUrl";

const connectDB = async () => {
  await mongoose.connect(uriLocal);
};
const database = mongoose.connection;

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

export default connectDB;
