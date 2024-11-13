import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("Mongo DB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error. Ensure that you are connected" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
