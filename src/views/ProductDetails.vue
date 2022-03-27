<template>
  <Navbar />
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
import Navbar from "../components/Navbar";

// catch request id parameter
const route = useRoute();
const id = route.params.id;

// product
const product = ref(null);

// products collection reference
const docRef = doc(db, "products", id);

onMounted(() => {
  // fetch data of specific product
  onSnapshot(docRef, (snapshot) => {
    product.value = snapshot.data();
  });
});
</script>

<style scoped></style>
