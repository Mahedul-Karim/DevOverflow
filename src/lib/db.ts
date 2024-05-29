import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongodb url!!!");
  }

  if (isConnected) {
    return console.log("DB connection is already established");
  }

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connection was successfull!!");
    })
    .catch((err) => console.log("Error connecting to database!!"));
};
