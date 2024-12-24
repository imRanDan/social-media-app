

https://github.com/user-attachments/assets/d8b00370-7642-47ec-bd47-8c85783aa34e

# Instagram Clone

This is a fully functional Instagram clone built with **React**, **Chakra UI**, **Vite**, and powered by **Zustand** for state management and **Firebase** as the backend database.

## Features

- **Authentication**: User authentication via Firebase (sign up, login, logout).
- **Image Uploads**: Users can upload images as posts.
- **Like & Comment System**: Users can like and comment on posts.
- **Profile Management**: Users can update their profiles and view posts from other users.
- **Real-Time Updates**: The app uses Firebase's real-time capabilities to update posts, likes, and comments instantly.

## Tech Stack

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Chakra UI**: A simple, modular, and accessible component library for React.
  - **Vite**: A fast, next-generation build tool for modern web development.
  - **Zustand**: A small, fast, and scalable state-management tool.

- **Backend**:
  - **Firebase**: A backend-as-a-service (BaaS) for real-time data storage, authentication, and more.

## Getting Started

To get started with this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/instagram-clone.git
cd instagram-clone
```
### 2. Install dependencies

Install the project dependencies using npm or yarn:
```bash
npm install
```

### 3. Set up Firebase
    Create a Firebase project and set up Firebase Authentication and Firestore.
    Add your Firebase config to the firebase.js file (located in src/firebase.js).
### 4. Run the app

Once the dependencies are installed and Firebase is set up, you can run the app locally:

```bash
npm run dev
```
