import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { CategorySpec, IdSpec } from "../models/joi-schemas.js"
import { validationError } from "./logger.js"

export const categoryApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Get all categoryApi",
    notes: "Returns details of all categoryApi",
    response: { schema: CategorySpec, failAction: validationError},
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific category",
    notes: "Returns category details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpec, failAction: validationError },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
   
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete one categoryApi",
    notes: "Delete one category from Poi",
    response: { schema: CategorySpec, failAction: validationError},
  },
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  tags: ["api"],
  description: "Delete all categoryApi",
  notes: "All categoryApi removed from Poi",
};
