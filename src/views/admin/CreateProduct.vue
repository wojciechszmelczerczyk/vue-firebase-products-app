<template>
  <Navbar :isAdmin="isAdmin" />
  <form>
    <label>Name: </label>
    <input v-model="name" />
    <div class="name-error">{{ errors.name }}</div>

    <label>Price: </label>
    <input v-model="price" />
    <div class="price-error">{{ errors.price }}</div>

    <label>Quantity: </label>
    <input v-model="quantity" />
    <div class="quantity-error">{{ errors.quantity }}</div>

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
    <div class="info-error">{{ errors.info }}</div>

    <label>model</label>
    <input v-model="model" />
    <div class="model-error">{{ errors.model }}</div>

    <button @click="cancel">Cancel</button>
    <button @click="addProduct">Add product</button>
  </form>
</template>

<script setup>
import ProductService from "../../composables/ProductService.js";

import { ref, onMounted, reactive } from "@vue/runtime-core";
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

let sum;

// errors
let errors = reactive({
  name: "",
  price: "",
  quantity: "",
  state: "",
  category: "",
  info: "",
  model: "",
});

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
  const error = await ProductService.createProduct(
    (sum = price.value * quantity.value),
    name.value,
    price.value,
    quantity.value,
    state.value,
    category.value,
    info.value,
    model.value,
    errors
  );
  if (error) {
    if (error.includes("Price")) {
      errors.price = error;
    } else if (error.includes("Quantity")) {
      errors.quantity = error;
    } else if (error.includes("Name")) {
      errors.name = error;
    } else if (error.includes("Info")) {
      errors.info = error;
    } else if (error.includes("Model")) {
      errors.model = error;
    }
  } else {
    router.push("/products");
  }
};

const cancel = (e) => {
  e.preventDefault();
  router.push("/products");
};
</script>

<style></style>
