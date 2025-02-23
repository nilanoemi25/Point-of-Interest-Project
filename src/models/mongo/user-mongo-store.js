import { User } from "./user.js";

// continue from mongoose server 

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
  }
};
