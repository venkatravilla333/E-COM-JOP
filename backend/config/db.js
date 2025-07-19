import mongoose from 'mongoose';


export let connectWithMongoDB = () => {
    mongoose
  .connect(
   process.env.DB_URI
  )
  .then((data) => {
    console.log(`Db connected ${data.connection.host}`);
  })
}
