<template>
  <Navbar :isAdmin="isAdmin" />
  <div v-if="!products">
    <p>Loading...</p>
  </div>
  <a class="addProduct" v-if="isAdmin" href="/products/add">Add product</a>
  <form class="productsForm">
    <select v-model="category" @change="fetchDataByCategory">
      <option selected="selected" value="">All</option>
      <option value="garden">Garden</option>
      <option value="house">House</option>
      <option value="sport">Sport</option>
    </select>
    <input class="filter" v-model="search" @input="searchProduct" />
  </form>
<div class="productLists">
  <div class="home" v-for="product in products" :key="product.id">
    <router-link :to="{ path: `/products/${product.id}` }">
      {{ product.name }}/{{ product.price }}/{{ product.quantity }}
    </router-link>
    <router-link v-if="isAdmin" :to="{ path: `/products/update/${product.id}` }"
      >Edit</router-link
    >
    <button v-if="isAdmin" @click="deleteProduct(product.id)">Delete</button>
  </div>
</div>

</template>

<script setup>
import ProductService from "../composables/ProductService";
import { db } from "../firebaseConfig";
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
import { collection, deleteDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import ManageUsersService from "@/composables/admin/ManageUsersService";
import decode from "jsonwebtoken/decode";

// products var
let products = ref([]);

// filter
const search = ref(null);

// filter
const category = ref(null);

// products collection reference
const productsColRef = collection(db, "products");

// admin flag
const isAdmin = ref(false);

onMounted(async () => {
  // fetch all products from database
  await ProductService.getProducts(productsColRef, products);

  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
});

// query data with specific category
const fetchDataByCategory = async () =>
  await ProductService.getProductsByCategory(
    category,
    products,
    productsColRef
  );

// search product by input
const searchProduct = async () => {
  await ProductService.getProductByName(
    category,
    search,
    products,
    productsColRef
  );
};

const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
</script>

<style scoped>
a.addProduct {
  display: block;
  text-decoration: none;
  font-style: normal;
  align-self: center;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  margin: 50px 0 68px;
  color:#42b983;
}
form.productsForm{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 494px;
}
form.productsForm select{
  width: 178px;
  height: 59px;
}
input.filter{
  width: 311px;
  height: 59px;
}
div.productLists{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 494px;
  padding: 96px 0 0;
}
#app > div > div{
  display: flex;
  width: 80%;
  height: 69px;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  margin-bottom: 33px;
  background: #EEEEEE;
  line-height: 14px;
  border-radius: 10px;
  padding-left: 20px;
}
#app > div > div > a{
  text-decoration: none;
  color: black;
}

#app > div > div > a:nth-child(2){
  color: #749CA1;
}
#app > div > div > button{
  width: 125px;
  height: 69px;
  border-radius: 10px;
  background-color: #008000;
  color: white;
  font-size: 22px;
  font-weight: 400;
}
</style>
