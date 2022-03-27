# Products App

## Simple Crud application

## Table of contents

- [Techstack](#techstack)
- [Requirements](#requirements)
- [To run](#to-run)

  - [Clone repository](#clone-repository)
  - [Navigate to project](#navigate-to-project)
  - [Install dependencies](#install-dependencies)
  - [Setup variables](#setup-environment-variables-for-firebase)
  - [Run application](#run-application)

- [App Architecture](#app-architecture)
- [Database Architecture](#database-architecture)
- Middlewares
  - [JWT middleware](#verify-token-middleware)
  - [Admin middleware](#verify-admin-middleware)
- [Endpoints](#router)

  - User

    - [Login](#login)
    - [Products](#products)

  - Admin
    - [Users](#users)

## Techstack

- `Vue`
- `Javascript`
- `Firebase`

## Requirements

- install `node`
- install `vue cli`
- install `firebase`

## To run

### Clone repository

```
git clone repo
```

### Navigate to project

```
cd /path/to/project
```

### Install dependencies

```
npm i
```

### Setup environment variables for Firebase

```javascript
API_KEY = "your-api-key";
AUTH_DOMAIN = "your-auth-domain";
PROJECT_ID = "your-project-id";
STORAGE_BUCKET = "your-storage-bucket";
MESSAGING_SENDER_ID = "your-messaging-sender-id";
APP_ID = "your-app-id";
```

### Run application

```
npm run serve
```

## App Architecture

[![](https://mermaid.ink/img/pako:eNpNj0EOgjAQRa_SzEoTuAALE6B6ADFuKItKR2m0lAytxhDubqWYOKuf_99M_kzQWoWQwY3k0LETFz0Lk9dH6x1Sw9J0x4rNWeNrG6Niscq6QnrqFpvFjWa-6DLu_GleHzThRY4rzeMJBgkYJCO1CgWmbyTAdWhQQBakknQXIPo5cH5Q0uFeaWcJsqt8jJiA9M5W776FzJHHH8S1DM-YlZo_faJEHQ)](https://mermaid.live/edit#pako:eNpNj0EOgjAQRa_SzEoTuAALE6B6ADFuKItKR2m0lAytxhDubqWYOKuf_99M_kzQWoWQwY3k0LETFz0Lk9dH6x1Sw9J0x4rNWeNrG6Niscq6QnrqFpvFjWa-6DLu_GleHzThRY4rzeMJBgkYJCO1CgWmbyTAdWhQQBakknQXIPo5cH5Q0uFeaWcJsqt8jJiA9M5W776FzJHHH8S1DM-YlZo_faJEHQ)

## Database Architecture

[![](https://mermaid.ink/img/pako:eNp1kDEOwjAMRa8SeeYEmWFgQ-qaxUrSEtE44DhDVfXuuFCQQKon678v-9sz-BIiWPAj1npMODBmR0brpZgLl9C81FUxb_CVrOmEEw3Go8Sh8LTHs-4Yf-GXEeb4j86k8yKbOye_Cx8NSZJM__xELZsqGmlnY6K-OIID5MgZU9Dr59XqQK5Rw4DVNiDfHDha1NfuQaedQpLCYHscazwANindRB6scIsf0_bBzbU8AUI6d68)](https://mermaid.live/edit#pako:eNp1kDEOwjAMRa8SeeYEmWFgQ-qaxUrSEtE44DhDVfXuuFCQQKon678v-9sz-BIiWPAj1npMODBmR0brpZgLl9C81FUxb_CVrOmEEw3Go8Sh8LTHs-4Yf-GXEeb4j86k8yKbOye_Cx8NSZJM__xELZsqGmlnY6K-OIID5MgZU9Dr59XqQK5Rw4DVNiDfHDha1NfuQaedQpLCYHscazwANindRB6scIsf0_bBzbU8AUI6d68)

[![](https://mermaid.ink/img/pako:eNptjzsOAjEMRK8Sud4TpIYTrOjcWLHZjcgHOUmBVnt3sh8QBa48b0bWeAGXWcCCC1TKxdOkFDGZPjsxtyJaNmkOemhrxqo-TUYi-fDXac3zj_HlmoPsHBMMEEX7Be4Flg0i1FmiINi-MukDAdPac-3JVOXKvmYFe6dQZABqNY-v5MBWbfIJnU-cqfUNUvFKyw)](https://mermaid.live/edit#pako:eNptjzsOAjEMRK8Sud4TpIYTrOjcWLHZjcgHOUmBVnt3sh8QBa48b0bWeAGXWcCCC1TKxdOkFDGZPjsxtyJaNmkOemhrxqo-TUYi-fDXac3zj_HlmoPsHBMMEEX7Be4Flg0i1FmiINi-MukDAdPac-3JVOXKvmYFe6dQZABqNY-v5MBWbfIJnU-cqfUNUvFKyw)

<br />

## Router

### Application routing for user and admin.

<br />

### User

| Endpoint        | Component      | Authenticated | Action                              |
| :-------------- | :------------- | :-----------: | :---------------------------------- |
| `/products`     | ProductsList   |      \*       | Returns all products                |
| `/products/:id` | ProductDetails |      \*       | Returns info about specific product |
| `/login`        | Login          |       -       | Login with correct credentials      |

### Admin

| Endpoint        | Component  | Authenticated | Action          |
| :-------------- | :--------- | :-----------: | :-------------- |
| `/users`        | UsersList  |      \*       | List all users  |
| `/users/create` | CreateUser |      \*       | Create new user |

<br />

### Verify token middleware

#### Before each route except login.

#### Verify token by decoding from cookie email credential and check if user with such email exists in database.

```javascript
async verifyToken(to, from, next) {
    // no auth for login path
    if (to.path === "/login") {
      next();
      // otherwise verify token
    } else {
      // fetch token from cookie
      const token = localStorage.getItem("token");

      if (token) {
        // intercept email from token
        const { email } = await decode(token);

        // fetch user from db with email from token if exists ok, otherwise error
        const isCorrect = await ManageUsersService.default.getUserByEmail(
          email
        );

        if (isCorrect) {
          next();
        } else {
          next("/login");
        }
      } else {
        next("/login");
      }
    }
  }

```

### Verify admin middleware

#### Verify if user have admin permission.

```javascript
async isAdmin(to, from, next) {
    // fetch token from cookie
    const token = localStorage.getItem("token");

    // intercept role from decoded token
    const { email } = await decode(token);

    const user = await ManageUsersService.default.getUserByEmail(email);

    const isAdmin = user[1].isAdmin;

    // if admin next
    if (isAdmin) {
      next();

      // otherwise prompt na error
    } else {
      throw new Error("You are not allowed. No admin permission");
    }
  },d

```

#### Admin middleware apply to following routes:

```javascript
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
```

### Login

#### Login process work with Firebase Auth API.

#### User provide basic credentials (email and password).

#### In order to log in, user has to be created by admin at first.

```javascript
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
```

#### When process is correct, jwt is store in local storage.

```javascript
const token = res.user.accessToken;
localStorage.setItem("token", token);
```

### Products

#### Authorized users can check product list.

#### Service fetch all products

```javascript
async getProducts(colRef, refVar) {
    // get documents
    const querySnapshot = await getDocs(colRef);
    // tmp variable
    let products = [];
    // iterate on data
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    // set reference variable to be equal data from firestore
    refVar.value = products;
    return products;
  },

```

#### Users are able to filter product based on category.

#### Service fetch products depends on category.

```javascript
async getProductsByCategory(category, productsVar, colRef) {
    // query data by specific category
    let q = category.value
      ? query(colRef, where("category", "==", category.value))
      : colRef;
    const querySnapshot = await getDocs(q);
    // tmp variable
    let products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    productsVar.value = products;
  },
```

### Specific product

#### Users can check details about specific product.

#### Service fetch product by id.

```javascript
// fetch data of specific product
onSnapshot(docRef, (snapshot) => {
  product.value = snapshot.data();
});
```

### Users

#### User with admin role can list all users.

```javascript
async getUsers(usersRef) {

    let usersTmp = [];

    const usersColl = await collection(db, "users");

    const users = await getDocs(usersColl);

    users.forEach((user) => {
      usersTmp.push({ ...user.data(), id: user.id });
    });

    usersRef.value = usersTmp;
  },
```

#### Admin can create new user. Process work with Firebase Auth API.

#### Users are store in the database with default role "user".

```javascript
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
```
