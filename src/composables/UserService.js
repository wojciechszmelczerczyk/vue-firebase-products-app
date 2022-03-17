import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  async loginUser(auth, email, password) {
    // log user with provided credentials
    const loggedInUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // return user in order to store token in local storage
    return loggedInUser;
  },
};
