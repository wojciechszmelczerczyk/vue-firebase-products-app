<template>
  <Navbar :isAdmin="isAdmin" />
  <router-link :to="{ path: '/users/create' }">Create user</router-link>
  <h1>Users list</h1>
  <div class="home" v-for="user in users" :key="user.id">
    {{ user.email }}
  </div>
</template>

<script setup>
import ManageUsersService from "../../composables/admin/ManageUsersService";
import Navbar from "../../components/Navbar";
const { onMounted, ref } = require("@vue/runtime-core");
import decode from "jsonwebtoken/decode";

// users variable
const users = ref([]);

// is admin
const isAdmin = ref(false);

// fetch all users
onMounted(async () => {
  // get all users
  await ManageUsersService.getUsers(users);

  // get user permission
  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
});
</script>

<style></style>
