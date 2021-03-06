import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "../views/ProductsList.vue";
import ProductDetails from "../views/ProductDetails.vue";
import UsersList from "../views/admin/UsersList.vue";
import CreateUser from "../views/admin/CreateUser.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import CreateProduct from "../views/admin/CreateProduct.vue";
import UpdateProduct from "../views/admin/UpdateProduct.vue";

import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

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
  { path: "/login", name: "Login", component: Login },
  { path: "/logout", name: "Logout", component: Logout },

  {
    path: "/users",
    name: "UsersList",
    component: UsersList,
    beforeEnter: isAdmin,
  },
  {
    path: "/users/create",
    name: "CreateUser",
    component: CreateUser,
    beforeEnter: isAdmin,
  },

  {
    path: "/products/add",
    name: "CreateProduct",
    component: CreateProduct,
    beforeEnter: isAdmin,
  },

  {
    path: "/products/update/:id",
    name: "UpdateProduct",
    component: UpdateProduct,
    beforeEnter: isAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// jwt middleware
router.beforeEach(verifyToken);

export default router;
