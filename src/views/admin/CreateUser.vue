<template>
  <Navbar :isAdmin="isAdmin" />
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
import ManageUsersService from "../../composables/admin/ManageUsersService";
import { onMounted, ref } from "@vue/runtime-core";
import { authenticate } from "../../firebaseConfig";
import { useRouter } from "vue-router";
import Navbar from "../../components/Navbar";
import decode from "jsonwebtoken/decode";

// catch email from form input
const email = ref(null);

// catch password from form input
const password = ref(null);

// router
const router = useRouter();

// is admin
const isAdmin = ref(false);

onMounted(async () => {
  // get user permission
  const token = localStorage.getItem("token");
  const { email } = await decode(token);
  const currentUser = await ManageUsersService.getUserByEmail(email);
  isAdmin.value = currentUser[1].isAdmin;
});

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
