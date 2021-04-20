import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("something is undefined undefined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
};

start();
