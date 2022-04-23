<template>
  <Navbar :isAdmin="isAdmin" />
  <form class="productForm">
    <div class="nameForm">
      <label>Name: </label>
      <input @input="clearErrors('name')" v-model="name" />
      <div class="name-error">{{ errors.name }}</div>
    </div>
    <div class="priceForm">
      <label>Price: </label>
      <input @input="clearErrors('price')" v-model="price" />
      <div class="price-error">{{ errors.price }}</div>
    </div>
    <div class="quantityForm">
      <label>Quantity: </label>
      <input @input="clearErrors('quantity')" v-model="quantity" />
      <div class="quantity-error">{{ errors.quantity }}</div>
    </div>

    <div class="stateForm">
      <label>State:</label>
    <select v-model="state">
      <option>ok</option>
      <option>damaged</option>
      <option>borrowed</option>
    </select>
    </div>
    <div class="categoryForm">
      <label>Category</label>
      <select v-model="category">
        <option>garden</option>
        <option>house</option>
    </select>
    </div>
    <div class="infoForm">
    <label>Info: </label>
        <textarea @input="clearErrors('info')" v-model="info"></textarea>
        <div class="info-error">{{ errors.info }}</div>
    </div>
    <div class="modelForm">
      <label>model</label>
      <input @input="clearErrors('model')" v-model="model" />
      <div class="model-error">{{ errors.model }}</div>
    </div>

    
    <button class="cancelCreateProduct" @click="cancel">Cancel</button>
    <button class="addCreateProduct" @click="addProduct">Add product</button>
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
const errors = reactive({
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
// clear inputs
const clearErrors = (p) => {
  for (let error in errors) {
    if (error === p) {
      errors[error] = "";
    }
  }
};
const cancel = (e) => {
  e.preventDefault();
  router.push("/products");
};
</script>

<style>
  form.productForm{
    min-height: 900px;
    border-radius: 10px;
    background-color: #EEEEEE;
  }
  div.nameForm, div.priceForm, div.quantityForm, div.stateForm, div.categoryForm, div.infoForm, div.modelForm{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 82px;
  padding: 0 23% 28px;

}
div.nameForm label, div.priceForm label, div.quantityForm label, div.stateForm label, div.categoryForm label, div.infoForm label, div.modelForm label{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 4px;
}
div.nameForm input, div.priceForm input, div.quantityForm input, div.infoForm textarea, div.modelForm input{
  width: 311px;
  height: 59px;
  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 4px;
}
div.stateForm select, div.categoryForm select{
  width: 311px;
  height: 25px;
}
#app > form >  button.cancelCreateProduct, #app > form > button.addCreateProduct{
  position: absolute;
  width: 105px;
  height: 48px;
  left: 78%;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  width: 105px;
  height: 48px;
  background-color: #008000;
  color: white;
  border-color: #008000;
  margin-top: 62px;
} 
#app > form > button.cancelCreateProduct:nth-of-type(1){
  margin-top: 62px;
  left: 58%;
  background-color: red;
  border-color: red;
}
</style>
