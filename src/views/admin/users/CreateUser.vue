<template>
  <form>
    <label>Email</label>
    <input v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <router-link :to="{ path: '/users' }">
      <button @click="cancel">Cancel</button>
    </router-link>
    <button @click="createNewUser">Create user</button>
  </form>
</template>

<script setup>
import ManageUsersService from "../../../composables/admin/ManageUsersService";
import { ref } from "@vue/runtime-core";
import { authenticate } from "../../../firebaseConfig";
import { useRouter } from "vue-router";

// catch email from form input
const email = ref(null);

// catch password from form input
const password = ref(null);

// router
const router = useRouter();

// create new user
const createNewUser = async (e) => {
  e.preventDefault();
  await ManageUsersService.createUser(
    authenticate,
    email.value,
    password.value
  );
  router.push("/users");
};
</script>
<style></style>
