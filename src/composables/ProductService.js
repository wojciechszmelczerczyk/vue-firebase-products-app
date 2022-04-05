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
  async createProduct(
    sum,
    name,
    price,
    quantity,
    state,
    category,
    info,
    model,
    errors
  ) {
    try {
      if (
        !isNaN(parseInt(price)) &&
        !isNaN(parseInt(quantity)) &&
        isNaN(parseInt(name)) &&
        isNaN(parseInt(info)) &&
        isNaN(parseInt(model))
      ) {
        const colRef = await collection(db, "products");
        const product = {
          sum,
          name,
          price,
          quantity,
          state,
          category,
          info,
          model,
        };
        await addDoc(colRef, product);
      } else if (isNaN(parseInt(price))) {
        throw new Error("Price has to be a number");
      } else if (isNaN(parseInt(quantity))) {
        throw new Error("Quantity has to be a number");
      } else if (!isNaN(parseInt(name))) {
        throw new Error("Name has to be a string");
      } else if (!isNaN(parseInt(info))) {
        throw new Error("Info has to be a string");
      } else if (!isNaN(parseInt(model))) {
        throw new Error("Model has to be a string");
      }
    } catch (err) {
      if (err.message.includes("Price")) {
        errors.price = err.message;
        return errors.price;
      } else if (err.message.includes("Quantity")) {
        errors.quantity = err.message;
        return errors.quantity;
      } else if (err.message.includes("Name")) {
        errors.name = err.message;
        return errors.name;
      } else if (err.message.includes("Info")) {
        errors.info = err.message;
        return errors.info;
      } else if (err.message.includes("Model")) {
        errors.model = err.message;
        return errors.model;
      }
    }
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
  async updateProduct(
    id,
    sum,
    name,
    price,
    quantity,
    state,
    category,
    info,
    model,
    errors
  ) {
    try {
      if (
        !isNaN(parseInt(price)) &&
        !isNaN(parseInt(quantity)) &&
        isNaN(parseInt(name)) &&
        isNaN(parseInt(info)) &&
        isNaN(parseInt(model))
      ) {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
          name,
          sum,
          price,
          quantity,
          state,
          category,
          info,
          model,
        });
      } else if (isNaN(parseInt(price))) {
        throw new Error("Price has to be a number");
      } else if (isNaN(parseInt(quantity))) {
        throw new Error("Quantity has to be a number");
      } else if (!isNaN(parseInt(name))) {
        throw new Error("Name has to be a string");
      } else if (!isNaN(parseInt(info))) {
        throw new Error("Info has to be a string");
      } else if (!isNaN(parseInt(model))) {
        throw new Error("Model has to be a string");
      }
    } catch (err) {
      if (err.message.includes("Price")) {
        errors.price = err.message;
        return errors.price;
      } else if (err.message.includes("Quantity")) {
        errors.quantity = err.message;
        return errors.quantity;
      } else if (err.message.includes("Name")) {
        errors.name = err.message;
        return errors.name;
      } else if (err.message.includes("Info")) {
        errors.info = err.message;
        return errors.info;
      } else if (err.message.includes("Model")) {
        errors.model = err.message;
        return errors.model;
      }
    }
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
