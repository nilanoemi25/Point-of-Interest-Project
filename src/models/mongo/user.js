import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status: {
    type: String, 
    default: "active"
  }
});


export const User = Mongoose.model("User", userSchema);
