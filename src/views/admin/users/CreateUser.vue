<template>
  <form>
    <label>Email</label>
    <input v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <button @click="createNewUser">Create user</button>
  </form>
</template>

<script setup>
import UserService from "../../../composables/UserService";
import { ref } from "@vue/runtime-core";
import { authenticate } from "../../../firebaseConfig";

// catch email from form input
const email = ref(null);

// catch password from form input
const password = ref(null);

// create new user
const createNewUser = async (e) => {
  e.preventDefault();
  await UserService.createUser(authenticate, email.value, password.value);
};
</script>
<style></style>
