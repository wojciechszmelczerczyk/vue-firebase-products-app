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

| Endpoint      |   Component    | Action                                       |
| :------------ | :------------: | :------------------------------------------- |
| /products     |  ProductsList  | Returns products of currently logged in user |
| /products/:id | ProductDetails | Returns info about specific product          |
