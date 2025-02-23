import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,

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
};
