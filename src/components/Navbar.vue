<template>
  <nav>
    <router-link to="/products">Products</router-link>
    <!-- if user is admin display routerlink -->
    <router-link v-if="isAdmin" to="/users">Users</router-link>
    <router-link v-if="isAdmin" to="/manage-products"
      >Products Managment</router-link
    >
    <router-link to="/logout">Logout</router-link>
  </nav>
</template>

<script setup>
const { toRefs } = require("@vue/reactivity");

// define props
const props = defineProps({
  isAdmin: Boolean,
});

// intercept prop
const { isAdmin } = toRefs(props);
</script>

<style>
* {
  margin: 0;
}
nav {
  background-color: #ddd;
}
nav > * {
  margin-left: 30px;
  text-decoration: none;
}
</style>
