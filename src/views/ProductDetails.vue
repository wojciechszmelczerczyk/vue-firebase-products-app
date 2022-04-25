<template>
  <Navbar :isAdmin="isAdmin" />
  <h1 class="productsDetails">Products Details</h1>
  <div v-if="!product">
    <p>Loading...</p>
  </div>
  <div class="detailsListAbout">
    <div class="about" v-for="value in product" :key="value">
    <span>{{ value }}</span>
  </div>
  </div>
  
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { db } from "../firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";
import ManageUsersService from "@/composables/admin/ManageUsersService";
import decode from "jsonwebtoken/decode";
import Navbar from "../components/Navbar";

// catch request id parameter
const route = useRoute();
const id = route.params.id;

// product
const product = ref(null);

// products collection reference
const docRef = doc(db, "products", id);

// is admin
const isAdmin = ref(false);

onMounted(async () => {
  // fetch data of specific product
  onSnapshot(docRef, (snapshot) => {
    product.value = snapshot.data();
  });
  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
});
</script>

<style scoped>
h1.productsDetails{
  display: block;
  font-style: normal;
  align-self: center;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
}
.detailsListAbout div.about{
  align-self: center;
  line-height: 30px;
  width: 100%;
  height: 50px;
  margin-top: 24px;
  background: #EEEEEE;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  padding-top: 35px;
}

</style>
