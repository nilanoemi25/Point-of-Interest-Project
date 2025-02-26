import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  comment: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Comment = Mongoose.model("Comment", commentSchema);
