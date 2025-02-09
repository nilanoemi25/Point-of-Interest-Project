import { db } from "../models/db.js";
import { PoiSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PoiSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poi-view", { title: "Add track error", errors: error.details }).takeover().code(400);
      },
    },
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

  deletePoi: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.poiStore.deletePoi(request.params.poiid);
      return h.redirect(`/category/${category._id}`);
    },
  },

};
