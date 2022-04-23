<template>
  <form class="loginForm">
    <h1>Login</h1>
    <div class="emailForm">
      <label>Email: </label>
      <input @input="clearErrors('email')" type="text" v-model="email" />
      <div class="email-error">{{ errors.email }}</div>
    </div>
    <div class="passForm">
      <label>Password: </label>
      <input
        @input="clearErrors('password')"
        type="password"
        v-model="password"
      />
      <div class="password-error">{{ errors.password }}</div>
    </div>
    
    <div class="buttonForm">
      <button class="loginButton" @click="loginUser">Login</button>
    </div>
    
  </form>
</template>

<script setup>
import { authenticate } from "../firebaseConfig";
import UserService from "../composables/UserService";
import { reactive, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// catch email
const email = ref(null);

// catch password
const password = ref(null);

// errors
const errors = reactive({ email: null, password: null });

// router
const router = useRouter();

// try to login user, if credentials wrong display error message
const loginUser = async (e) => {
  e.preventDefault();
  try {
    let res = await UserService.loginUser(
      authenticate,
      email.value,
      password.value
    );
    const token = res.user.accessToken;

    localStorage.setItem("token", token);
    router.push("/products");
  } catch (err) {
    // clean input after submit
    email.value = password.value = "";
    // populate with error message
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
#app{
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 581px;
}
form.loginForm{
  height: 510px;
  border-radius: 10px;
  background-color: #EEEEEE;
}
h1{
  display: block;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  padding: 50px 0 68px;
}
div.emailForm{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 82px;
  padding: 0 23% 58px;

}
div.emailForm label{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 4px;
}
div.emailForm input{
  width: 311px;
  height: 59px;
  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 4px;
}
div.passForm{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 82px;
  padding: 0 23% 47px;

}
div.passForm label{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 4px;
}
div.passForm input{
  width: 311px;
  height: 59px;
  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 4px;
}
div.buttonForm{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 82px;
  padding-left: 78%;

}
div.buttonForm button.loginButton{
  display: flex;
  justify-content: center;
  font-style: normal;
  padding-top: 8%;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  width: 105px;
  height: 48px;
  background-color: #008000;
  color: white;
} 

/* styles for form error messages*/
div[class$="-error"] {
  color:  red;
}
</style>
