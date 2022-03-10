import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "../views/ProductsList.vue";
import ProductDetails from "../views/ProductDetails.vue";
import UsersList from "../views/admin/users/UsersList.vue";
import CreateUser from "../views/admin/users/CreateUser.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/products",
    name: "ProductsList",
    component: ProductsList,
  },
  {
    path: "/products/:id",
    name: "ProductDetails",
    component: ProductDetails,
  },
  { path: "/users", name: "UsersList", component: UsersList },
  { path: "/users/create", name: "CreateUser", component: CreateUser },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
