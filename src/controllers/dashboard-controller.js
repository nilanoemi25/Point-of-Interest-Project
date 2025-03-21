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
      console.log(comments)
      const viewData = {
        title: "Discussion Board",
        user: loggedInUser,
        comments: comments, 
      };
      return h.view("discussion-view", viewData);
    },
  },

  deleteComment: {
    handler: async function (request, h) {
      const comment = await db.commentStore.getCommentById(request.params.id);
      await db.commentStore.deleteCommentById(comment._id);
      return h.redirect("/discussion");
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
      const useremail= loggedInUser.email;
      const userid= loggedInUser._id;
      const Privileges = await db.userStore.getAdminPrivileges(useremail);
   //  const countArray = await db.categoryStore.getUserCategories(userid); // gets me the categories of the current user. 
  //    const test = Object.keys(countArray).length; // counts the current amount of categories 
  //    console.log(test) // prints current count to screen 

      // get me all users, in a loop get all ids, for each id get me their categories, for each id view the category count
      const analyticsArray = []

      const allUsersObj = await db.userStore.getAllUsers();
      Object.keys(allUsersObj).forEach(async key => {
      const { _id } = allUsersObj[key];
      const categories = await db.categoryStore.getUserCategories(_id);
      const countOG =  Object.keys(categories).length;
     // console.log(countOG)
      allUsersObj.count = countOG; 
      console.log(allUsersObj.count)
      const { email } = allUsersObj[key];
      analyticsArray.push(email, allUsersObj.count);
      console.log(analyticsArray)
      return analyticsArray; // printing email and category count to console.
      })

  
      let accessString;
      if(Privileges != null){
        accessString = "Admin Access"
      }
      else{
        accessString = "Access Denied"
      }

      const viewData = {
        title: "Admin Page",
        user: loggedInUser, 
        allUsers: Privileges,
        accessString: accessString,
        analyticsArray: analyticsArray
      
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
