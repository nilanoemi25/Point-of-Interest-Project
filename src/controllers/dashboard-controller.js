import { db } from "../models/db.js";
import { CategorySpec, CommentSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore?.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "Point of Interest Dashboard",
        user: loggedInUser, 
        categories: categories, 
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    validate: {
        payload: CategorySpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dashboard-view", { title: "Add Category error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; 
      const newCategory = {
        userid: loggedInUser._id, 
        name: request.payload.name,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },


  addComment: {
     validate: {
        payload: CommentSpec, 
        options: { abortEarly: false },
        failAction: function (request, h, error) {
         return h.view("dashboard-view", { title: "Add Comment error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; 
      const newComment = {
        userid: loggedInUser._id, 
        comment: request.payload.comment, 
      };
      await db.commentStore.addComment(newComment);
      return h.redirect("/discussion");
    },
  },

  discussion: {
    handler: async function (request, h) {
     const loggedInUser = request.auth.credentials;
      const comments = await db.commentStore.getAllComments();
      // const usersArray =[];
      // for ( let i =0; i < comments.length; i++){
      //   const user = db.userStore.getUserById(comments[i].userid)
      //   usersArray.push(user);
      // }
      // console.log(usersArray);
      const viewData = {
        title: "Discussion Board",
        user: loggedInUser,
        comments: comments, 
      };
      return h.view("discussion-view", viewData);
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },

  admin: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const { email } = loggedInUser;
      const allUsers = await db.userStore.getAdminPrivileges(email);
      let accessString;
      if(allUsers != null){
        accessString = "Admin Access"
      }
      else{
        accessString = "Access Denied"
      }
      const viewData = {
        title: "Admin Page",
        user: loggedInUser, 
        allUsers: allUsers,
        accessString: accessString,
      
      };
      return h.view("admin-view", viewData);
    },
  },
  adminDelete: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const { email } = request.payload;
      const tobedeleteduser = await db.userStore.getUserByEmail(email);
      const id = tobedeleteduser._id;
      await db.userStore.deleteUserById(id);
      const refreshUsers = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Page",
        user: loggedInUser, 
        allUsers: refreshUsers,
      };
      return h.view("admin-view", viewData);
    },
  },

  suspend: {
    handler: async function(request, h) {
    const {email} = request.params;
    const user = await db.userStore.suspend(email)
    const refreshUsers = await db.userStore.getAllUsers();
    const viewData ={
      title: "Admin Page2",
      allUsers: refreshUsers,
    };
    return h.view("admin-view",viewData)
    },
   
  },

};
