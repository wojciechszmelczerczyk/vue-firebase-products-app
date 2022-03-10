// import firebase config
import { getDocs, query, where } from "firebase/firestore";

export default {
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
