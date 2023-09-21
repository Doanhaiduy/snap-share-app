# Social Connect - SnapShare

URL website: [https://snap-share-78f51.web.app/](https://snap-share-78f51.web.app/)

Welcome to the documentation for the Social Connect project. Social Connect is a modern social networking platform that enables users to connect, share, and engage with others through a wide range of features.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Firebase Configuration](#firebase-configuration)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

Social Connect is a feature-rich web-based social networking platform that allows users to create meaningful connections and interactions with friends and other users.

## Features

1. **User Authentication**: Secure user registration and login system powered by Firebase Authentication.
2. **Posting**: Users can create, edit, and delete posts.
3. **Interaction**: Users can like, comment on, and share posts.
4. **Profile Customization**: Personalize your profile using Tailwind CSS for seamless UI customization.
5. **Search**: Effortlessly discover other users through a robust search functionality.
6. **Friendship**: Send and accept friend requests to connect with others.
7. **Following**: Follow your favorite users to stay updated with their posts.
8. **Messaging**: Engage in private conversations with other users using Firebase Realtime Database.
9. **Dark Mode**: Toggle between light and dark UI themes for comfortable browsing.
10. **Real-time Updates**: Experience real-time notifications for activities through Firebase Realtime Database.
11. **Responsive Design**: Enjoy a consistent experience across various devices.
12. **Real-time Functionality**: Leverage Firebase's real-time capabilities for seamless interactions.

## Installation

1. Clone the repository: `git clone https://github.com/Doanhaiduy/snap-share-app.git`
2. Navigate to the project directory: `cd snap-share-app`
3. Install dependencies: `npm install`
4. Configure Firebase credentials and environment variables (see [Firebase Configuration](#firebase-configuration)).
5. Run the development server: `npm start`

## Usage

1. Register an account or log in if you already have one using Firebase Authentication.
2. Explore and interact with various features through the user-friendly interface.
3. Share your thoughts by creating posts, engaging with others' content, and connecting with friends.
4. Tailor your profile's appearance using Tailwind CSS for a unique look.
5. Discover new connections through the robust search feature.
6. Enjoy real-time messaging with other users through Firebase Realtime Database.

## Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
2. Obtain your Firebase configuration credentials (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) from the project settings.
3. Rename the `.env.example` file to `.env` in the project root directory.
4. Replace the placeholder values in `.env` with your Firebase configuration credentials.

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Technologies Used

-   Frontend: HTML, CSS (Tailwind CSS), JavaScript (React.js)
-   Backend: Firebase (Authentication, Firestore Database, Storage, Hosting)
-   Other dependencies: [list any other major dependencies here]

## Contributing

Contributions are highly appreciated! If you encounter any issues or have innovative ideas, feel free to open an issue or submit a pull request. For significant changes, kindly discuss them with the project maintainers beforehand.

## License

This project is licensed under the [Your License] License - refer to the [LICENSE](LICENSE) file for more details.
