import mongoose from "mongoose";
import config from "config";

let dbConnect = async () => {
  let dbURL = config.get("DB_URL");
  await mongoose.connect(dbURL);

  console.log("DB COnnected succcessfully");
};

dbConnect();
