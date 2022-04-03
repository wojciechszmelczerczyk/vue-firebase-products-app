// import firebase config
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
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
    const q = query(colRef);
    onSnapshot(q, (querySnapshot) => {
      // tmp variable
      let products = [];
      // iterate on data
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      refVar.value = products;
      return products;
    });
    // set reference variable to be equal data from firestore
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
  async getProductById(product, id) {
    // intercept document with specific id
    const docRef = doc(db, "products", id);
    onSnapshot(docRef, (snapshot) => {
      product.value = snapshot.data();
    });
  },
  async updateProduct(id, name, price, quantity, state, category, info, model) {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      name,
      price,
      quantity,
      state,
      category,
      info,
      model,
    });
  },
  async getProductByName(category, search, productsVar, colRef) {
    if (search.value) {
      const modifiedList = productsVar.value.filter((prod) =>
        prod.name.includes(search.value.toLowerCase())
      );
      productsVar.value = modifiedList;
    } else {
      await this.getProductsByCategory(category, productsVar, colRef);
    }
  },
};
