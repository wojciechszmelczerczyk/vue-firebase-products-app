<template>
  <div v-if="!products">
    <p>Loading...</p>
  </div>
  <form>
    <select v-model="category">
      <option value="garden">Garden</option>
      <option value="house">House</option>
      <option value="sport">Sport</option>
    </select>
    <button @click="fetchDataByCategory">Search</button>
  </form>
  <input class="filter" v-model="search" />
  <h1>Category: {{ search }}</h1>
  <div class="home" v-for="product in products" :key="product.id">
    <router-link :to="{ path: `/products/${product.id}` }">
      {{ product.name }}/{{ product.price }}/{{ product.quantity }}
    </router-link>
  </div>
</template>

<script setup>
import ProductService from "../composables/ProductService";
import { db } from "../firebaseConfig";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { collection } from "firebase/firestore";

// products var
let products = ref([]);

// filter
const search = ref(null);

// filter
const category = ref(null);

// products collection reference
const productsColRef = collection(db, "products");

// when component mounted, fetch products
onMounted(async () => {
  await ProductService.getProducts(productsColRef, products);
});
// TODO: access products.value outside the hook scope

// query data with specific category
const fetchDataByCategory = async (e) => {
  e.preventDefault();
  await ProductService.getProductsByCategory(
    category,
    products,
    productsColRef
  );
};
</script>

<style scoped></style>
