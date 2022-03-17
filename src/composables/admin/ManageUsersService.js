import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
  async createUser(auth, email, password) {
    // create user with credentials
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // add to database
    const usersColl = await collection(db, "users");

    const newUser = await addDoc(usersColl, {
      email,
      uuid: res.user.uid,
      role: "user",
    });
  },
  async getUsers(usersRef) {
    let usersTmp = [];

    const usersColl = await collection(db, "users");

    const users = await getDocs(usersColl);

    users.forEach((user) => {
      usersTmp.push({ ...user.data(), id: user.id });
    });

    usersRef.value = usersTmp;
  },
};
