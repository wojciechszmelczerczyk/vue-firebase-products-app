<template>
  <Navbar :isAdmin="isAdmin" />
  <div v-if="!product">
    <p>Loading...</p>
  </div>
  <div class="about" v-for="value in product" :key="value">
    <span>{{ value }}</span>
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

<style scoped></style>
