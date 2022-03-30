<template>
  <form>
    <label>Name: </label>
    <input v-model="name" />
    <label>Price: </label>
    <input v-model="price" />
    <label>Quantity: </label>
    <input v-model="quantity" />
    <label>State:</label>
    <select v-model="state">
      <option>ok</option>
      <option>damaged</option>
      <option>borrowed</option>
    </select>
    <label>Category</label>
    <select v-model="category">
      <option>garden</option>
      <option>house</option>
    </select>
    <label>Info: </label>
    <textarea v-model="info"></textarea>
    <label>model</label>
    <input v-model="model" />
    <button @click="addProduct">Add product</button>
  </form>
</template>

<script setup>
import ProductService from "../../composables/ProductService.js";

import { ref, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const name = ref(null);
const price = ref(null);
const quantity = ref(null);
const state = ref(null);
const category = ref(null);
const info = ref(null);
const model = ref(null);

// router
const router = useRouter();

watchEffect(() => {
  console.log(name.value);
});

const addProduct = async (e) => {
  e.preventDefault();
  await ProductService.createProduct(
    name.value,
    price.value,
    quantity.value,
    state.value,
    category.value,
    info.value,
    model.value
  );
  router.push("/products");
};
</script>

<style></style>
