import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(`Connected to DB!! ${connectionInstance.connection.host}
    `);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("An error occurred", error);
    }
    throw new Error("Error connecting to DB");
  }
};

export default connectDB;
