<template>
  <Navbar :isAdmin="isAdmin" />
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
    <button @click="cancel">Cancel</button>
    <button @click="addProduct">Add product</button>
  </form>
</template>

<script setup>
import ProductService from "../../composables/ProductService.js";

import { ref, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import Navbar from "../../components/Navbar.vue";
import ManageUsersService from "@/composables/admin/ManageUsersService";
import decode from "jsonwebtoken/decode";

const name = ref(null);
const price = ref(null);
const quantity = ref(null);
const state = ref(null);
const category = ref(null);
const info = ref(null);
const model = ref(null);

// router
const router = useRouter();

const isAdmin = ref(false);

onMounted(async () => {
  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
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

const cancel = (e) => {
  e.preventDefault();
  router.push("/products");
};
</script>

<style></style>
