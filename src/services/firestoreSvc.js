import { db } from "..";

const firestoreSvc = {
  async getCategories() {
    return db.collection("category").get();
  },
  async getBrands() {
    return db.collection("brands").get();
  },
  async getItems() {
    return db.collection("items").get();
  },
  async getNewItems() {
    return db.collection("items").where("status", "==", "new").get();
  },
};

export default firestoreSvc;


