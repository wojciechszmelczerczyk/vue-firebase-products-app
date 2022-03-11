import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";
export default {
  async createUser(auth, email, password) {
    // create user with credentials
    await createUserWithEmailAndPassword(auth, email, password);
    // redirect to users page
    await useRouter().push({ name: "UsersList" });
  },
  async loginUser(auth, email, password) {
    // log user with provided credentials
    const loggedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // redirect to products page
    await useRouter().push({ name: "ProductsList" });
    // return user in order to store token in local storage
    return loggedInUser;
  },
};
