import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl, // localhost:3000

  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },
  async authenticate(user) {
    const response = await axios.post(`${this.poiUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },
  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
  async createCategory(category) {
    const res = await axios.post(`${this.poiUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.poiUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.poiUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.poiUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.poiUrl}/api/categories/${id}`);
    return res.data;
  },

  async createPoi(id, poi) {
    const res = await axios.post(`${this.poiUrl}/api/categories/${id}/pois`, poi);
    return res.data;
  },

  async deleteAllPois() {
    const res = await axios.delete(`${this.poiUrl}/api/pois`);
    return res.data;
  },

  async getAllPois() {
    const res = await axios.get(`${this.poiUrl}/api/pois`);
    return res.data;
  },

  async getPoi(id) {
    const res = await axios.get(`${this.poiUrl}/api/pois/${id}`);
    return res.data;
  },

  async deletePoi(id) {
    const response = await axios.delete(`${this.poiUrl}/api/pois/${id}`);
    return response;
  },

};
