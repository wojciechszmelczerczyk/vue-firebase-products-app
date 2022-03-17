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
- [Endpoints](#router)

## Techstack

- `Vue`
- `Javascript`
- `Firebase`

## Requirements

- install `node`

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

<br />

## Router

### Application routing for user and admin.

<br />

### User

| Endpoint        | Component      | Action                              |
| :-------------- | :------------- | :---------------------------------- |
| `/products`     | ProductsList   | Returns all products                |
| `/products/:id` | ProductDetails | Returns info about specific product |
| `/login`        | Login          | Login with correct credentials      |

### Admin

| Endpoint        | Component  | Action          |
| :-------------- | :--------- | :-------------- |
| `/users`        | UsersList  | List all users  |
| `/users/create` | CreateUser | Create new user |
