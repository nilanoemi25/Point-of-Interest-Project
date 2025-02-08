import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const pois = await db.poiStore.getAllPois();
      const viewData = {
        title: "Point of Interest Dashboard",
        pois: pois, 
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPoi: {
    handler: async function (request, h) {
      const newPoi = {
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        location: request.payload.location,
        image: request.payload.image, 
      };
      await db.poiStore.addPoi(newPoi);
      return h.redirect("/dashboard");
    },
  },
};
