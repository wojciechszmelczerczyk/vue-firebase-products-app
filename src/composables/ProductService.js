// import firebase config
import { db } from "../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const productsColRef = collection(db, "products");

export default {
  // get all products
  getProducts() {
    let products = [];
    onSnapshot(productsColRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
    });
    return products;
  },
};
