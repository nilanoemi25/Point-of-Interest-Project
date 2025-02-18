import Mongoose from "mongoose";
import { Poi } from "./poi.js";

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().lean();
    return pois;
  },

  async addPoi(categoryId, poi) {
    poi.categoryid = categoryId;
    const newPoi = new Poi(poi);
    const poiObj = await newPoi.save();
    return this.getPoiById(poiObj._id);
  },

  async getPoisByCategoryId(id) {
    const pois = await Poi.find({ categoryid: id }).lean();
    return pois;
  },

  async getPoiById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const poi = await Poi.findOne({ _id: id }).lean();
      return poi;
    }
    return null;
  },

  async deletePoi(id) {
    try {
      await Poi.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPois() {
    await Poi.deleteMany({});
  },

  async updatePoi(poi, updatedPoi) {
    const poiDoc = await Poi.findOne({ _id: poi._id });
    poiDoc.title = updatedPoi.title;
    poiDoc.artist = updatedPoi.artist;
    poiDoc.duration = updatedPoi.duration;
    await poiDoc.save();
  },
};

