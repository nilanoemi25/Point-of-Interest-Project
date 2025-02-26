import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, categoryHotel, testCategories } from "../fixtures.js"

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

    let user = null; 

    setup(async () => {
      await poiService.deleteAllCategories();
      await poiService.deleteAllUsers();
      user = await poiService.createUser(maggie);
      await poiService.authenticate(maggie);
      categoryHotel.userid = user._id;
    });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await poiService.createCategory(categoryHotel);
    assert.isNotNull(returnedCategory);
    assertSubset(categoryHotel, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await poiService.createCategory(categoryHotel);
    const response = await poiService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await poiService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }

  });

  test("create multiple Categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createCategory(testCategories[i]);
    }
    let returnedLists = await poiService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await poiService.deleteAllCategories();
    returnedLists = await poiService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await poiService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
