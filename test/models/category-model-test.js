import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPois, categoryCastle } from "../fixtures.js";

suite("Category Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.categoryStore.deleteAllCategories();
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.categoryStore.addCategory(testPois[i]);
    }
  });

  test("create a category", async () => {
    const category = await db.categoryStore.addCategory(categoryCastle);
    assert.equal(categoryCastle, category);
    assert.isDefined(category._id);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.categoryStore.deleteAllCategories();
    returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("get a category - success", async () => {
    const category = await db.categoryStore.addCategory(categoryCastle);
    const returnedCategory = await db.categoryStore.getCategoryById(category._id);
    assert.equal(categoryCastle, category);
  });

  test("delete One Category - success", async () => {
    const id = testPois[0]._id;
    await db.categoryStore.deleteCategoryById(id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testPois.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(id);
    assert.isNull(deletedCategory);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete One Category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.categoryStore.getAllCategories();
    assert.equal(testPois.length, allCategories.length);
  });
});
