<template>
  <div v-if="!products.length">
    <p>Loading...</p>
  </div>
  <div class="home" v-for="product in products" :key="product.id">
    <router-link :to="{ path: `/products/${product.id}` }">
      {{ product.name }}/{{ product.price }}/{{ product.quantity }}
    </router-link>
  </div>
</template>

<script>
// import ProductDetails from "../views/ProductDetails.vue";s
// @ is an alias to /src
// import ProductService from "../composables/ProductService";
import { onMounted, ref } from "@vue/runtime-core";
import { db } from "../firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
export default {
  name: "HomeView",
  // components: {
  //   ProductDetails,
  // },
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

<style scoped></style>
