import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PoiSpec, IdSpec } from "../models/joi-schemas.js"
import { validationError } from "./logger.js"


export const poiApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getAllPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all poiApi",
    notes: "Returns details of all poiApi",
    response: { schema: PoiSpec, failAction: validationError},
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No poi with this id");
      }
    },
        tags: ["api"],
        description: "Get a specific poi",
        notes: "Returns poi details",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: CategorySpec, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.addPoi(request.params.id, request.payload);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
       tags: ["api"],
        description: "Create a poi",
        notes: "Returns the newly created poi",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: CategorySpec, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.poiStore.deleteAllPois();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all poiApi",
    notes: "All poiApi removed from Poi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        await db.poiStore.deletePoi(poi._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete one poiApi",
    notes: "Delete one poi from Poi",
    response: { schema: PoiSpec, failAction: validationError},
  },
};
