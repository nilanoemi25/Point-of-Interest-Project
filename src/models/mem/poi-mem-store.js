import { v4 } from "uuid";

let pois = [];

// export the poiMemStore object to be accessible in other files
export const poiMemStore = {

// return all Point of Interest from the pois array
  async getAllPois() {
    return pois;
  },
// add one Point of Interest to the pois array
  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },
// get all the Point of Interests associated with a given(logged in) user
  async getUserPois(userid) {
    return pois.filter((poi) => poi.userid === userid);
  },

// get a Point of Interest based on its Id
  async getPoiById(id) {
    let list = pois.find((poi) => poi._id === id);
    if (list === undefined) 
    {
      list = null; 
    } 
    return list;
  },
// delete a Point of Interest based on its Id
  async deletePoiById(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    if (index !== -1) pois.splice(index, 1);

  },
// delete all Point of Interest by setting the pois array to be empty
  async deleteAllPois() {
    pois = [];
  },
};