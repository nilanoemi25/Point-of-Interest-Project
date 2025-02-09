import { v4 } from "uuid";

let pois = [];

export const poiMemStore = {
  async getAllPois() {
    return pois;
  },

  async addPoi(categoryId, poi) {
    poi._id = v4();
    poi.categoryid = categoryId;
    pois.push(poi);
    console.log(poi); 
    return poi;
  },

  async getPoisByCategoryId(id) {
    return pois.filter((poi) => poi.categoryid === id);
  },

  async getPoiById(id) {
    let foundPoi = pois.find((poi) => poi._id === id);
    if (!foundPoi) {
      foundPoi = null;
    }
    return foundPoi;
  },

  async getCategoryPois(playlistId) {
    let foundPois = pois.filter((poi) => poi.playlistid === playlistId);
    if (!foundPois) {
      foundPois = null;
    }
    return foundPois;
  },

  async deletePoi(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    if (index !== -1) pois.splice(index, 1);
  },


  async deleteAllPois() {
    pois = [];
  },

  async updatePoi(poi, updatedPoi) {
    poi.name = updatedPoi.name;
    poi.description = updatedPoi.description;
    poi.location = updatedPoi.location;
  },
};