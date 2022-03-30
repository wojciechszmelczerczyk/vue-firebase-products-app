<template>
  <button @click="navigateTo('/manage-products/create')" class="addProduct">
    Add product
  </button>
  <button @click="navigateTo('/manage-products/update')" class="editProduct">
    Edit product
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => router.push(path);
</script>

<style></style>
