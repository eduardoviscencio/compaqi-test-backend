import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connection = process.env.DB_CONNECTION;

    if (!connection) throw "Database url is invalid";

    await mongoose.connect(connection);

    console.log("Database connected");
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    throw new Error("Cannot connect to database");
  }
};
