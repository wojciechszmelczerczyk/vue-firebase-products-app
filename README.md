# Products App

## Simple Crud application

## Techstack

- `Vue`
- `Javascript`
- `Firebase`

## Requirements

- install `node`

## Environment variables

### Setup env variables

```javascript
API_KEY = "your api key";
AUTH_DOMAIN = "your auth domain";
PROJECT_ID = "your project id";
STORAGE_BUCKET = "your storage bucket";
MESSAGING_SENDER_ID = "your messaging sender id";
APP_ID = "your app id";
```

### Firebase configuration

```javascript
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
```

## Services

### Fetch all products

```javascript
let tmpProducts = [];
onSnapshot(productsColRef, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    tmpProducts.push({ ...doc.data(), id: doc.id });
  });
  // assign products to reactive variable
  products.value = tmpProducts;
});
```

### Fetch product with specific id

```javascript
onSnapshot(docRef, (snapshot) => {
  product.value = snapshot.data();
});
```

## Usage

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

### Run application

```
npm run serve
```

<br />

## Router

### Application routing for user and admin.

<br />

### User

| Endpoint      | Component      | Action                                       |
| :------------ | :------------- | :------------------------------------------- |
| /products     | ProductsList   | Returns products of currently logged in user |
| /products/:id | ProductDetails | Returns info about specific product          |

## App architecture

[![](https://mermaid.ink/img/pako:eNo1jksOgzAMRK9ieQ0XyKISlPYCrdQFYeESU6KSBIWwQMDd6_68Go3ePHnFNhhGhY9IYw_XSnuQK-rjYNknuPG9gTw_wNZxanswlGiDsj7byFMKkZvPoPwy0o3BT7xBgRk6jo6sEfn6hjSmnh1rVBINxadG7Xfh5lGsfDJWfKg6GibOkOYULotvUaU48x-qLMmj7kftL-nDP1k)](https://mermaid.live/edit#pako:eNo1jksOgzAMRK9ieQ0XyKISlPYCrdQFYeESU6KSBIWwQMDd6_68Go3ePHnFNhhGhY9IYw_XSnuQK-rjYNknuPG9gTw_wNZxanswlGiDsj7byFMKkZvPoPwy0o3BT7xBgRk6jo6sEfn6hjSmnh1rVBINxadG7Xfh5lGsfDJWfKg6GibOkOYULotvUaU48x-qLMmj7kftL-nDP1k)
