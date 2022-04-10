<template>
  <Navbar :isAdmin="isAdmin" />
  <h1 class="usersList">Users list</h1>
  <router-link :to="{ path: '/users/create' }" class="createButton">Create user</router-link>
  
  <div class="usersListHome">
    <div class="home" v-for="user in users" :key="user.id">
    {{ user.email }}
    </div>
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

<style>
h1.usersList{
  display: block;
  font-style: normal;
  align-self: center;
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
}
a.createButton{
  display: block;
  width: 95px;
  padding: 10px 0;
  background: #33B04E;
  color: white;
  text-decoration: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
}

.usersListHome div.home{
  align-self: center;
  line-height: 30px;
  width: 100%;
  height: 50px;
  margin-top: 24px;
  background: #EEEEEE;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  padding-top: 35px;
}
.usersListHome div.home:nth-child(5){
  margin-bottom: 50px;
}

</style>
