


https://github.com/user-attachments/assets/ab1d7400-bcdf-40c0-a464-f4dfb5da6c3e



**ConnectWit** is a private social network MVP designed for close-knit friend groups. It was inspired by Instagram but reimagined to prioritize tighter social circles, privacy, and real-time interaction.

Built with React, Vite, Chakra UI, and Firebase, the project handles authentication, media sharing, privacy controls, and live updates — making it a strong foundation for scalable social platforms.

## Features

### Core Features
- **Authentication**: User authentication via Firebase (sign up, login, logout).
- **Image Uploads**: Users can upload images as posts.
- **Like & Comment System**: Users can like and comment on posts.
- **Profile Management**: Users can update their profiles and view posts from other users.
- **Real-Time Updates**: The app uses Firebase's real-time capabilities to update posts, likes, and comments instantly.

### Privacy Features
- **Private Profiles**: Users can set their profiles to private, requiring friend requests before others can see their posts.
- **Friend Request System**: Instead of direct following, users send friend requests that must be accepted (for private profiles) or can follow directly (for public profiles).
- **Groups/Circles**: Create private groups to share posts exclusively with selected friends. Perfect for close-knit circles.
- **Group Posts**: Share posts to specific groups, keeping content within your chosen circle.
- **Privacy Controls**: Toggle between public and private profiles in settings.

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
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```
### 2. Install dependencies

Install the project dependencies using npm or yarn:
```bash
npm install
```

### 3. Set up Firebase
    Create a Firebase project and set up:
    - Firebase Authentication (Email/Password and Google)
    - Firestore Database
    - Firebase Storage
    
    Add your Firebase config to the `src/firebase/firebase.js` file using environment variables:
    ```javascript
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

### 4. Firebase Security Rules
    Set up Firestore Security Rules to protect user data. The app expects:
    - Users collection with privacy controls
    - Posts collection with group support
    - Groups collection for private circles
### 4. Run the app

Once the dependencies are installed and Firebase is set up, you can run the app locally:

```bash
npm run dev
```
