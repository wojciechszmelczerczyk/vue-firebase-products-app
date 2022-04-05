<template>
  <form>
    <label>Name: </label>
    <input @input="clearErrors('name')" v-model="name" />
    <div class="name-error">{{ errors.name }}</div>

    <label>Price: </label>
    <input @input="clearErrors('price')" v-model="price" />
    <div class="price-error">{{ errors.price }}</div>

    <label>Quantity: </label>
    <input @input="clearErrors('quantity')" v-model="quantity" />
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
    <textarea @input="clearErrors('info')" v-model="info"></textarea>
    <div class="info-error">{{ errors.info }}</div>

    <label>model</label>
    <input @input="clearErrors('model')" v-model="model" />
    <div class="model-error">{{ errors.model }}</div>

    <button @click="cancel">Cancel</button>
    <button @click="updateProduct">Update product</button>
  </form>
</template>

<script setup>
import { onMounted, ref, reactive } from "@vue/runtime-core";
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

let sum;

// errors
const errors = reactive({
  name: null,
  price: null,
  quantity: null,
  state: null,
  category: null,
  info: null,
  model: null,
});

// clear inputs
const clearErrors = (p) => {
  for (let error in errors) {
    if (error === p) {
      errors[error] = "";
    }
  }
};

// product ref
const product = ref(null);

const docRef = doc(db, "products", id);

const cancel = (e) => {
  e.preventDefault();
  router.push("/products");
};

const updateProduct = async (e) => {
  e.preventDefault();
  const error = await ProductService.updateProduct(
    id,
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
