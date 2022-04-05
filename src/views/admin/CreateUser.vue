<template>
  <Navbar :isAdmin="isAdmin" />
  <form>
    <label>Email</label>
    <input @input="clearErrors('email')" v-model="email" />
    <div class="email-error">{{ errors.email }}</div>
    <label>Password</label>
    <input
      @input="clearErrors('password')"
      type="password"
      v-model="password"
    />
    <div class="password-error">{{ errors.password }}</div>
    <router-link :to="{ path: '/users' }">
      <button @click="cancel">Cancel</button>
    </router-link>
    <button @click="createNewUser">Create user</button>
  </form>
</template>

<script setup>
import ManageUsersService from "../../composables/admin/ManageUsersService";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { authenticate } from "../../firebaseConfig";
import { useRouter } from "vue-router";
import Navbar from "../../components/Navbar";
import decode from "jsonwebtoken/decode";

// catch email from form input
const email = ref(null);

// catch password from form input
const password = ref(null);

const errors = reactive({ email: "", password: "" });

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
  try {
    e.preventDefault();
    await ManageUsersService.createUser(
      authenticate,
      email.value,
      password.value
    );
    router.push("/users");
  } catch (err) {
    email.value = password.value = "";
    if (err.message.includes("email")) {
      errors.email = "Invalid email";
    } else {
      errors.password = "Invalid password";
    }
  }
};

// clear inputs
const clearErrors = (p) => {
  for (let error in errors) {
    if (error === p) {
      errors[error] = "";
    }
  }
};
</script>
<style></style>
