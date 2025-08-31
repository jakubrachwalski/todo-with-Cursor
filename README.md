# Todo App - Firebase Powered

A modern todo application built with Next.js, React, and Firebase for real-time task management.

## 🚀 Features

- ✅ **Real-time data synchronization** with Firebase Firestore
- ✅ **Create, read, update, delete** todos
- ✅ **Mark todos as complete/incomplete**
- ✅ **Edit todos inline** with keyboard shortcuts
- ✅ **Persistent data storage** with Firebase
- ✅ **Loading states and error handling**
- ✅ **Modern UI** with Tailwind CSS
- ✅ **Keyboard shortcuts** (Enter to add, Ctrl+Enter from anywhere)
- ✅ **Local storage fallback** when Firebase is not configured

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Firebase Firestore
- **Icons**: Lucide React
- **Development**: Hot reloading, error boundaries

## 🏃‍♂️ Quick Start

### Development
```bash
npm run dev
```

The app will be available at:
- **Local**: http://localhost:8080
- **Replit**: Via the webview interface

### Production
```bash
npm run build
npm start
```

## 🔧 Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)
2. **Enable Firestore Database** in test mode
3. **Get your configuration** from Project Settings > General > Your Apps
4. **Set environment variables** in Replit Secrets:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📖 Usage

1. **Add a todo**: Type in the input field and press Enter
2. **Complete a todo**: Click the checkbox next to any todo
3. **Edit a todo**: Click the edit icon (pencil) next to a todo
4. **Delete a todo**: Click the trash icon next to a todo
5. **Keyboard shortcuts**: 
   - `Enter` to add a todo
   - `Ctrl+Enter` to add from anywhere
   - `Escape` to cancel editing

## 🔍 Troubleshooting

- **Firebase not configured**: The app will use local storage as a fallback
- **Port conflicts**: The app runs on port 8080 by default
- **CORS issues**: Check the Next.js configuration for allowed origins

## 📁 Project Structure

```
src/
├── app/
│   ├── api/health/route.ts    # Health check endpoint
│   ├── layout.tsx             # Root layout with error boundary
│   ├── page.tsx               # Main todo app page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── TodoItem.tsx           # Individual todo component
│   ├── LoadingSpinner.tsx     # Loading state component
│   └── ErrorBoundary.tsx      # Error handling component
└── lib/
    ├── firebase.ts            # Firebase configuration
    ├── useTodos.ts            # Custom hook for todo operations
    ├── useKeyboardShortcuts.ts # Keyboard shortcuts hook
    └── utils.ts               # Utility functions
```

## 🎯 Current Status

- ✅ **Server running** on port 8080
- ✅ **Firebase configured** and working
- ✅ **All CRUD operations** functional
- ✅ **Real-time updates** working
- ✅ **Error handling** in place
- ✅ **Responsive design** implemented

## 📝 License

This project is open source and available under the MIT License.
