<template>
  <Navbar :isAdmin="isAdmin" />
  <button @click="navigateTo('/manage-products/create')" class="addProduct">
    Add product
  </button>
  <button @click="navigateTo('/manage-products/update')" class="editProduct">
    Edit product
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import Navbar from "../../components/Navbar.vue";
import ManageUsersService from "@/composables/admin/ManageUsersService";
import { onMounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import decode from "jsonwebtoken/decode";

const isAdmin = ref(false);

const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
});

const navigateTo = (path) => router.push(path);
</script>

<style></style>
