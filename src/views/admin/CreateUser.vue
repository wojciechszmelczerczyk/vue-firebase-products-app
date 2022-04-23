<template>
  <Navbar :isAdmin="isAdmin" />
  <form class="loginFormCreateUser">
    <div class="emailForm">
      <label class="createEmail">Email</label>
      <input @input="clearErrors('email')" v-model="email" />
      <div class="email-error">{{ errors.email }}</div>
    </div>
    <div class="passForm">
      <label class="createPass">Password</label>
      <input
      @input="clearErrors('password')"
      type="password"
      v-model="password"
    />
      <div class="password-error">{{ errors.password }}</div>
    </div>
    <router-link :to="{ path: '/users' }">
      <button class="createButtons" @click="cancel">Cancel</button>
    </router-link>
    <button class="createButtons" @click="createNewUser">Create user</button>
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
<style>
form.loginFormCreateUser{
  height: 422px;
  border-radius: 10px;
  background-color: #EEEEEE;
}
div.emailForm{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 82px;
  padding: 0 23% 58px;

}
div.emailForm label.createEmail{
  padding-top: 120px;
}
div.emailForm input{
  min-height: 59px;
}
div.passForm label.createPass{
  padding-top: 90px;
}
div.passForm input{
  min-height: 59px;
}
button.createButtons{
  position: absolute;
  width: 105px;
  height: 48px;
  left: 78%;
  font-style: normal;
  margin-top: 92px;
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  width: 105px;
  height: 48px;
  background-color: #008000;
  color: white;
  border-color: #008000;
} 
button.createButtons:nth-child(1){
  margin-top: 92px;
  left: 58%;
  background-color: red;
  border-color: red;
}
</style>
