// import firebase config
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default {
  async createProduct(name, price, quantity, state, category, info, model) {
    const colRef = await collection(db, "products");

    const product = {
      name,
      price,
      quantity,
      state,
      category,
      info,
      model,
    };

    await addDoc(colRef, product);
  },
  async getProducts(colRef, refVar) {
    // get documents
    const querySnapshot = await getDocs(colRef);
    // tmp variable
    let products = [];
    // iterate on data
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    // set reference variable to be equal data from firestore
    refVar.value = products;
    return products;
  },
  async getProductsByCategory(category, productsVar, colRef) {
    // query data by specific category
    let q = category.value
      ? query(colRef, where("category", "==", category.value))
      : colRef;
    const querySnapshot = await getDocs(q);
    // tmp variable
    let products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    productsVar.value = products;
  },
};
