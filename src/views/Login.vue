<template>
  <form>
    <label>Email: </label>
    <input @input="clearErrors" type="text" v-model="email" />
    <div class="email-error">{{ errors.email }}</div>
    <label>Password: </label>
    <input @input="clearErrors" type="password" v-model="password" />
    <div class="password-error">{{ errors.password }}</div>
    <button @click="loginUser">Login</button>
  </form>
</template>

<script setup>
import { authenticate } from "../firebaseConfig";
import UserService from "../composables/UserService";
import { reactive, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// catch email
const email = ref(null);

// catch password
const password = ref(null);

// errors
const errors = reactive({ email: null, password: null });

// router
const router = useRouter();

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
    router.push("/products");
  } catch (err) {
    // clean input after submit
    email.value = password.value = "";
    // populate with error message
    if (err.message.includes("email")) {
      errors.email = "Invalid email";
    } else {
      errors.password = "Invalid password";
    }
  }
};
// clear error messages on input action
const clearErrors = () => (errors.email = errors.password = "");
</script>

<style>
/* styles for form error messages*/
div[class$="-error"] {
  color: red;
}
</style>
