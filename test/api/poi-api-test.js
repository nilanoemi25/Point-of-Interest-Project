import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./poi-service.js";
import { maggie, categoryHotel, testCategories, testPois, } from "../fixtures.js";

suite("Poi API tests", () => {
  let user = null;
  let majorCategory = null;

  setup(async () => {
    await poiService.deleteAllCategories();
    await poiService.deleteAllUsers();
    await poiService.deleteAllPois();
    user = await poiService.createUser(maggie);
    categoryHotel.userid = user._id;
    majorCategory = await poiService.createPlaylist(categoryHotel);
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

  test("denormalised playlist", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(majorCategory._id, testPois[i]);
    }
    const returnedPlaylist = await poiService.getPlaylist(majorCategory._id);
    assert.equal(returnedPlaylist.pois.length, testPois.length);
    for (let i = 0; i < testPois.length; i += 1) {
      assertSubset(testPois[i], returnedPlaylist.pois[i]);
    }
  });
});
