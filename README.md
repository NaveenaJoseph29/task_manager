# Task Manager UI

## Description
This is the front-end of a Task Manager application built using React Native. The application allows users to create, edit, and manage tasks while also providing authentication features.

## Features
- User authentication
- Task creation and editing
- Pull-to-refresh for task list
- Logout functionality

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) or npm

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/NaveenaJoseph29/task_manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```


## Running the Application

To start the development server, run:
```sh
yarn start
# or
npm start
```

Scan the QR code with the Expo Go app on your mobile device to run the application.

## API Configuration
Ensure that the backend API is running and accessible at the URL provided in your `.env` file.

## Usage
- Open the app on your mobile device or emulator.
- Login with your credentials.
- Add, edit, or delete tasks as needed.
- Swipe down to refresh the task list.
- Logout when finished.

## Folder Structure
```
/task-manager-ui
│── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # Authentication and global state management
│   ├── screens/      # Application screens
│   ├── utils/        # Helper functions and API config
│── assets/           # Images and other assets
│── App.tsx          # Entry point of the app
│── package.json     # Dependencies and scripts
│── README.md        # Setup and usage instructions
```

## Issue in starting the App

If you are facing any issues in running the app go to the constants.ts file and change your system IP:
```sh
ipconfig
```
Copy the IPV4 address and paste it. 
