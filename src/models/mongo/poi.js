import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poiSchema = new Schema({
    name: String,
    description: String,
    location: String,
    image: String, 
    categoryid: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  });

  export const Poi = Mongoose.model("Poi", poiSchema);