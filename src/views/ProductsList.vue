<template>
  <div v-if="!products.length">
    <p>Loading...</p>
  </div>
  <div class="home" v-for="product in products" :key="product.id">
    <p>{{ product.quantity }}</p>
    <p>{{ product.model }}</p>
    <p>{{ product.name }}</p>
    <p>{{ product.price }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import ProductService from "../composables/ProductService";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { db } from "../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
export default {
  name: "HomeView",

  setup() {
    // products
    const products = ref([]);
    // products collection reference
    const productsColRef = collection(db, "products");

    // when component mounted, fetch products
    onMounted(() => {
      let tmpProducts = [];
      onSnapshot(productsColRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          tmpProducts.push({ ...doc.data(), id: doc.id });
        });
        // assign products to reactive variable
        products.value = tmpProducts;
      });
    });

    return { products };
  },
};
</script>
