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
    <button @click="cancel">Cancel</button>
    <button @click="updateProduct">Update product</button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import ProductService from "../../composables/ProductService.js";
import { useRoute } from "vue-router";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// router
const router = useRouter();

// catch request id parameter
const route = useRoute();
const id = route.params.id;

// fields
const name = ref(null);
const price = ref(null);
const quantity = ref(null);
const state = ref(null);
const category = ref(null);
const info = ref(null);
const model = ref(null);

// product ref
const product = ref(null);

const docRef = doc(db, "products", id);

const cancel = (e) => {
  e.preventDefault();
  router.push("/products");
};

const updateProduct = async (e) => {
  e.preventDefault();
  await ProductService.updateProduct(
    id,
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

onMounted(async () => {
  onSnapshot(docRef, (snapshot) => {
    product.value = snapshot.data();
    name.value = product.value.name;
    price.value = product.value.price;
    quantity.value = product.value.quantity;
    state.value = product.value.state;
    category.value = product.value.category;
    info.value = product.value.info;
    model.value = product.value.model;
  });
});
</script>

<style scoped></style>
