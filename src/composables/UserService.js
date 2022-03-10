import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  async createUser(auth, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  async loginUser(auth, email, password) {
    const loggedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return loggedInUser;
  },
};
