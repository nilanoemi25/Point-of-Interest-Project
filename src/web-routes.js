
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoriesController } from "./controllers/categories-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/admin", config: dashboardController.admin },
  { method: "POST", path: "/admin/delete", config: dashboardController.adminDelete },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory},

  { method: "GET", path: "/discussion", config: dashboardController.discussion },
  { method: "POST", path: "/discussion/add", config: dashboardController.addComment},
  { method: "GET", path: "/discussion/deletecomment/{id}", config: dashboardController.deleteComment},


  { method: "GET", path: "/category/{id}", config: categoriesController.index },
  { method: "POST", path: "/category/{id}/addpoi", config: categoriesController.addPoi },

  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory},
  { method: "GET", path: "/category/{id}/deletepoi/{poiid}", config: categoriesController.deletePoi},

  { method: "GET", path: "/dashboard/suspend/{email}", config: dashboardController.suspend},

  { method: "POST", path: "/category/{id}/uploadimage", config: categoriesController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  

];
