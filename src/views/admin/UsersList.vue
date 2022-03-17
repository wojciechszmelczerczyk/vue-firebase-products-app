<template>
  <router-link :to="{ path: '/users/create' }">Create user</router-link>
  <h1>Users list</h1>
  <div class="home" v-for="user in users" :key="user.id">
    {{ user.email }}
  </div>
</template>

<script setup>
import ManageUsersService from "../../composables/admin/ManageUsersService";
const { onMounted, ref } = require("@vue/runtime-core");

// users variable
const users = ref([]);

// fetch all users
onMounted(async () => {
  // get all users
  await ManageUsersService.getUsers(users);
});
</script>

<style></style>
