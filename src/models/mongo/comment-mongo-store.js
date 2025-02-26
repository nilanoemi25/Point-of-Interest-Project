import Mongoose from "mongoose";
import { Comment } from "./comment.js";

export const commentMongoStore = {
  async getAllComments() {
    const categories = await Comment.find().lean();
    return categories;
  },


  async addComment(comment) {
    const newComment = new Comment(comment);
    const commentObj = await newComment.save();
    return this.getCommentById(commentObj._id);
  
  },

  async getCommentById(id) {
      if (Mongoose.isValidObjectId(id)) {
        const poi = await Comment.findOne({ _id: id }).lean();
        return poi;
      }
      return null;
    },
  



  async deleteCommentById(id) {
    try {
      await Comment.deleteOne({ _id: id })
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllComments() {
    await Comment.deleteMany({});
  }
};
