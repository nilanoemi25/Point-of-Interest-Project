import { db } from "../models/db.js";

export const categoriesController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: category.name,
        category: category,
      };
      return h.view("poi-view", viewData);
    },
  },

  addPoi: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPoi = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        image: request.payload.image,
      };
      await db.poiStore.addPoi(category._id, newPoi);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
