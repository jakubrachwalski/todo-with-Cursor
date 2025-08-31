# Firebase Setup Guide

This todo app is configured to work with Firebase Firestore for real-time data persistence. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard to create your project

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you can add security rules later)
4. Select a location for your database

## 3. Get Your Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app and copy the configuration object

## 4. Set Environment Variables in Replit

In your Replit project, go to the "Secrets" tab and add the following environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with the actual values from your Firebase configuration object.

## 5. Security Rules (Optional)

For production use, you should set up proper Firestore security rules. Here's a basic example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if true; // For development only
    }
  }
}
```

## 6. Test Your Setup

1. Run the development server: `npm run dev`
2. Add a todo item
3. Check your Firebase console to see the data being stored in real-time

## Features

- ✅ Real-time data synchronization with Firebase
- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos inline
- ✅ Persistent data storage
- ✅ Loading states and error handling
- ✅ Modern UI with Tailwind CSS

## Troubleshooting

- Make sure all environment variables are set correctly
- Check the browser console for any Firebase-related errors
- Ensure your Firebase project has Firestore enabled
- Verify that your security rules allow read/write operations
