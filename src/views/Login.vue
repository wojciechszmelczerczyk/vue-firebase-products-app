<template>
  <form>
    <label>Email: </label>
    <input type="text" v-model="email" />
    <div class="email-error">{{ errors.email }}</div>
    <label>Password: </label>
    <input type="password" v-model="password" />
    <div class="password-error">{{ errors.password }}</div>
    <button @click="loginUser">Login</button>
  </form>
</template>

<script setup>
import { authenticate } from "../firebaseConfig";
import UserService from "../composables/UserService";
import { reactive, ref } from "@vue/runtime-core";

// catch email
const email = ref(null);

// catch password
const password = ref(null);

// errors
const errors = reactive({ email: null, password: null });

// try to login user, if credentials wrong display error message
const loginUser = async (e) => {
  e.preventDefault();
  try {
    let res = await UserService.loginUser(
      authenticate,
      email.value,
      password.value
    );
    const token = res.user.accessToken;
    localStorage.setItem("token", token);
  } catch (err) {
    // clean input after submit
    email.value = password.value = "";
    // populate with error message
    if (err.message.includes("email")) {
      errors.email = err.message;
    } else {
      errors.password = err.message;
    }
  }
};
</script>

<style></style>
