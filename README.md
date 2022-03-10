# Products App

## Simple Crud application

## Techstack

- `Vue`
- `Javascript`
- `Firebase`

## Requirements

- install `node`

## Environment variables

### Setup env variables for firebase

```javascript
API_KEY = "your-api-key";
AUTH_DOMAIN = "your-auth-domain";
PROJECT_ID = "your-project-id";
STORAGE_BUCKET = "your-storage-bucket";
MESSAGING_SENDER_ID = "your-messaging-sender-id";
APP_ID = "your-app-id";
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

| Endpoint      | Component      | Action                              |
| :------------ | :------------- | :---------------------------------- |
| /products     | ProductsList   | Returns all products                |
| /products/:id | ProductDetails | Returns info about specific product |

### Admin

| Endpoint      | Component  | Action          |
| :------------ | :--------- | :-------------- |
| /users        | UsersList  | List all users  |
| /users/create | CreateUser | Create new user |

## App architecture

[![](https://mermaid.ink/img/pako:eNo1jksOgzAMRK9ieQ0XyKISlPYCrdQFYeESU6KSBIWwQMDd6_68Go3ePHnFNhhGhY9IYw_XSnuQK-rjYNknuPG9gTw_wNZxanswlGiDsj7byFMKkZvPoPwy0o3BT7xBgRk6jo6sEfn6hjSmnh1rVBINxadG7Xfh5lGsfDJWfKg6GibOkOYULotvUaU48x-qLMmj7kftL-nDP1k)](https://mermaid.live/edit#pako:eNo1jksOgzAMRK9ieQ0XyKISlPYCrdQFYeESU6KSBIWwQMDd6_68Go3ePHnFNhhGhY9IYw_XSnuQK-rjYNknuPG9gTw_wNZxanswlGiDsj7byFMKkZvPoPwy0o3BT7xBgRk6jo6sEfn6hjSmnh1rVBINxadG7Xfh5lGsfDJWfKg6GibOkOYULotvUaU48x-qLMmj7kftL-nDP1k)
