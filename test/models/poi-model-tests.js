import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { categoryHotel, singlePoi, testPois, testUsers, testCategories } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poi Model tests", () => {

  let categoryList = null;
  const categoryCastle = {
    name: "Castle"
  }; 

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.poiStore.deleteAllPois();

    categoryList = await db.categoryStore.addCategory(categoryCastle);
    console.log(categoryList)
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(categoryList._id, testPois[i]);
    }
  });

  test("create single poi", async () => {
    const hotelList = await db.categoryStore.addCategory(categoryHotel);
    const poi = await db.poiStore.addPoi(hotelList._id, singlePoi)
    assert.isNotNull(poi._id);
    assertSubset (singlePoi, poi);
  });

  test("get multiple pois", async () => {
    const pois = await db.poiStore.getPoisByCategoryId(categoryList._id);
    assert.equal(pois.length, testPois.length)
  });

  test("delete all pois", async () => {
    const pois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, pois.length);
    await db.poiStore.deleteAllPois();
    const newPois = await db.poiStore.getAllPois();
    assert.equal(0, newPois.length);
  });

  test("get a poi - success", async () => {
    const hotelList = await db.categoryStore.addCategory(categoryHotel);
    const poi = await db.poiStore.addPoi(hotelList._id, singlePoi)
    const newPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset (singlePoi, newPoi);
  });

  test("delete One Poi - success", async () => {
    await db.poiStore.deletePoi(testPois[0]._id);
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(testPois[0]._id);
    assert.isNull(deletedPoi);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete one poi - fail", async () => {
    await db.poiStore.deletePoi("bad-id");
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length);
  });
});
