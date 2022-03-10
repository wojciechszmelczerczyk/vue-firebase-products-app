<template>
  <form>
    <label>Email: </label>
    <input type="text" v-model="email" />
    <label>Password: </label>
    <input type="password" v-model="password" />
    <button @click="loginUser">Login</button>
  </form>
</template>

<script setup>
import { authenticate } from "../firebaseConfig";
import UserService from "../composables/UserService";
import { ref } from "@vue/runtime-core";

// catch email
const email = ref(null);

// catch password
const password = ref(null);

const loginUser = async (e) => {
  e.preventDefault();
  let res = await UserService.loginUser(
    authenticate,
    email.value,
    password.value
  );
  const token = res.user.accessToken;
  localStorage.setItem("token", token);
};
</script>

<style></style>
