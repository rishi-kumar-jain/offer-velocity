import mongoose from "mongoose";

let isConnected = false; //for connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //just to ensure application is working nicely
  if (!process.env.MONGODB_URI)
    return console.log("MONGODB_URI IS not defined");

  if (isConnected) return console.log("using existing database connection");

  try {
    mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err);
  }
};
