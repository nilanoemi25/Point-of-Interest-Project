import { connections } from "mongoose";
import { User } from "./user.js";
import { userJsonStore } from "../json/user-json-store.js";


export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find({email: {$ne: "admin@admin.com"}}).lean();
    return users;
  },

  async getAdminPrivileges(email){
   if(email === "admin@admin.com"){
      const users = await this.getAllUsers();
      return users;
   }
   return null;

  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({email: {$ne:"admin@admin.com"}});
  },

  async suspend(email){
    let user = await this.getUserByEmail(email);
    console.log(user); 
     if(user.status === "active") {
      const newStatus = "inactive"
      user = await this.updateUser(user, newStatus)

    }
    return user; 
  },

  async updateUser(user, updatedStatus) {
    console.log(user._id)
      const SelectedUser = await User.findOne({ _id: user._id });
      SelectedUser.firstName = user.firstName;
      SelectedUser.lastName = user.lastName;
      SelectedUser.email = user.email; 
      SelectedUser.password = user.password; 
      SelectedUser.status = updatedStatus;
      await SelectedUser.save();
      return SelectedUser; 
  },
};
