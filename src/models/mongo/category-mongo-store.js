import { Category } from "./category.js";
import { poiMongoStore } from "./poi-mongo-store.js";


export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.pois = await poiMongoStore.getPoisByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  
  },

  async getUserCategories(id) {
    const category = await Category?.find({ userid: id }).lean();
    return category
},
    

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id })
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  async updateCategory(updatedCategory) {
    const category = await Category.findOne({ _id: updatedCategory._id });
    category.name = updatedCategory.name;
    category.img = updatedCategory.img;
    await category.save();
  },


};
