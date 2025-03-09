import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: String,
  img: String, // for Cloudinary
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Category = Mongoose.model("Category", categorySchema);
