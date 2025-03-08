import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./poi-service.js";
import { maggie, categoryHotel, testCategories, testPois, } from "../fixtures.js";

suite("Poi API tests 0", () => {
  let user = null;
  let majorCategory = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    await poiService.deleteAllCategories();
    await poiService.deleteAllTracks();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    majorCategory.userid = user._id;
    majorCategory = await poiService.createCategory(categoryHotel);
  });
  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await poiService.createPoi(majorCategory._id, categoryHotel);
    assertSubset(categoryHotel, returnedPoi);
  });

  test("create Multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(majorCategory._id, testPois[i]);
    }
    const returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await poiService.getPoi(returnedPois[i]._id);
      assertSubset(poi, returnedPois[i]);
    }
  });

  test("Delete PoiApi", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(majorCategory._id, testPois[i]);
    }
    let returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await poiService.deletePoi(returnedPois[i]._id);
    }
    returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(majorCategory._id, testPois[i]);
    }
    const returnedCategory = await poiService.getCategory(majorCategory._id);
    assert.equal(returnedCategory.pois.length, testPois.length);
    for (let i = 0; i < testPois.length; i += 1) {
      assertSubset(testPois[i], returnedCategory.pois[i]);
    }
  });
});
