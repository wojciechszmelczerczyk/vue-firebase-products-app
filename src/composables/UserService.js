import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  async createUser(auth, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  },
};
