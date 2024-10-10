# Online Exam Platform

This is an Online Exam Platform that allows users to take various subject-based exams and view their results. The platform supports user authentication (login/register), dynamic exam listing, and leaderboards.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features

The platform offers the following features:

### 1. **User Authentication**

- **Login/Register**: Users can register and log in using their email and password.
- **Third-Party Authentication**: Users can log in using Google or Facebook OAuth authentication.
- **Remember Me Option**: Option for users to remember their login credentials.
- **Profile Management**: Users can view and update their profile information, including passwords.

### 2. **Exam Listing**

- **Filter by Subject**: Users can filter the available exams by subject (HTML, CSS, JavaScript, ReactJS, NodeJS).
- **Filter by Difficulty**: Users can filter exams based on difficulty levels (Basic, Medium, Advanced).
- **Search Functionality**: A search bar allows users to search for exams by title.
- **Pagination Support**: The exam listing page supports pagination for a smoother experience when browsing through many exams.

### 3. **Take Exams**

- **Dynamic Exams**: Users can attempt exams that consist of multiple-choice questions.
- **Answer Feedback**: After completing the exam, users can see their score and correct answers.
- **Exam Timer**: Each exam has a designated time limit, and users can view their progress as they complete the exam.
- **Score Tracking**: Scores for completed exams are saved, and users can view their past performance.

### 4. **Leaderboards**

- **Top Scorers**: A leaderboard shows the top scorers for each subject, motivating users to achieve higher scores.
- **Rankings by Subject**: Users can filter the leaderboard by specific subjects like HTML, CSS, etc.

### 5. **User Dashboard**

- **Transcript View**: Users can view their past exam history, including scores and time taken for each exam.
- **Performance Overview**: The user dashboard gives an overview of the user’s performance across different exams.

### 6. **Admin Panel (For Admin Users)**

- **User Management**: Admins can manage users, including creating, updating, or deleting user accounts.
- **Exam Management**: Admins can create, update, or delete exams through a dedicated interface.
- **Feedback Management**: Admins can view feedback submitted by users and respond to user inquiries.

### 7. **Responsive Design**

- **Mobile Friendly**: The platform is designed to be fully responsive, providing a good experience on mobile devices and tablets.
- **Desktop Experience**: The platform works smoothly on desktop browsers, providing enhanced usability.

### 8. **Notifications**

- **Real-time Feedback**: The platform uses Ant Design's notification system to provide real-time feedback (e.g., for successful login, exam submission, etc.).
- **Error Handling**: Users are notified when actions fail, such as failed login attempts or form validation errors.

## Tech Stack

- **Frontend**: React, Ant Design, React Router
- **Backend**: JSON server (or you can replace this with a real backend)
- **State Management**: Context API
- **Form Handling**: Formik & Yup for form validation
- **Notification System**: Ant Design Notifications

## Setup

### Prerequisites

- **Node.js** (v14.x or above)
- **npm** or **yarn** (v6.x or above)

### Install dependencies:

```bash
npm install
```

### Start JSON Server

For mock data, the project uses JSON server. To run it:

1. Install JSON server globally:
   ```bash
   npm install -g json-server
   ```
2. Run JSON server with the provided `db.json` file:
   ```bash
   json-server --watch db.json --port 8080
   ```

### Run the Frontend

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
This will start the frontend on `http://localhost:3000`.

## Running the Project

### Local Development:

1. Start the JSON server using the command:

   ```bash
   json-server --watch db.json --port 8080
   ```

2. Run the frontend:
   ```bash
   npm start
   ```
   Runs the app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Google and Facebook Authentication:

To enable login via Google and Facebook, you will need to configure OAuth credentials from both platforms and update the environment variables accordingly.

## File Structure

```
/project-root
│
├── /database
│   └── db.json                    # Contains mock database for user, exams, and related data.
│
├── /node_modules                  # Auto-generated folder with project dependencies.
│
├── /public
│   ├── favicon.ico                # Favicon for the app.
│   ├── index.html                 # Entry point HTML file for the React app.
│   ├── logo192.png                # Logos used in the app.
│   ├── logo512.png
│   ├── manifest.json              # Web app manifest for progressive web app features.
│   └── robots.txt                 # Instructions for web crawlers (SEO related).
│
├── /src
│   ├── /components                # Reusable components like admin routes, protected routes.
│   │   ├── AdminRoute.js          # Route protection logic for admin users.
│   │   ├── PrivateRoute.js        # Route protection for authenticated users.
│
│   ├── /contexts                  # Context API logic for authentication and global state.
│   │   └── AuthContext.js         # Auth context to manage user authentication and state.
│
│   ├── /helpers                   # Utility functions used throughout the app.
│   │   └── convertTitleToSlug.js  # Helper function for converting quiz titles into URL slugs.
│
│   ├── /layouts                   # Layout components for different sections of the app.
│   │   ├── DefaultLayoutAdmin.js  # Admin layout with navigation and sidebar.
│   │   ├── DefaultLayoutUser.js   # Layout for general users (not included but implied).
│   │   └── styles.css             # CSS styles for layouts.
│
│   ├── /pages                     # Pages that represent different routes/views.
│   │   ├── /Admin                 # Admin-related pages.
│   │   │   ├── Dashboard.js       # Admin dashboard showing overall statistics.
│   │   │   ├── ManageExams        # CRUD operations for exams.
│   │   │   │   ├── CreateExam.js  # Page for creating or editing exams.
│   │   │   │   └── styles.css     # Styles for the exam creation page.
│   │   │   ├── ManageUsers.js     # Page for managing users.
│   │   │   └── ManageFeedback.js  # Page for viewing user feedback.
│   │   ├── ChangePassword         # Page for users to change their password.
│   │   ├── Contact                # Contact page.
│   │   ├── DetailExam             # Detailed view of an exam with quiz questions.
│   │   ├── Home                   # Home page with introductory content.
│   │   ├── Leaderboard            # Page displaying quiz rankings and user scores.
│   │   ├── ListExams              # List of exams with filtering options.
│   │   ├── Login                  # Login page.
│   │   ├── Profile                # User profile page.
│   │   ├── Register               # User registration page.
│   │   ├── Transcript             # Page showing user’s quiz history and scores.
│   │   └── styles.css             # Shared styles for multiple pages.
│
│   ├── App.js                     # Main React component for the app.
│   ├── firebase.js                # Firebase configuration (if using Firebase).
│   ├── index.css                  # Global CSS styles.
│   ├── index.js                   # Entry point for the React app.
│
├── .gitignore                     # Files and directories to be ignored by Git.
├── package-lock.json              # Lock file for package versions.
├── package.json                   # Lists project dependencies and scripts.
└── README.md                      # Documentation for the project.
```

### Project Structure Overview:

#### `/database`

- **db.json**: Mock database that holds data like users, exams, and quiz histories for development purposes.

#### `/public`

- **index.html**: The single HTML file where the React app is mounted.
- **manifest.json**: This file is used for Progressive Web App (PWA) settings.

#### `/src`

This is where all the React components and logic for the app reside.

- **/components**: Contains reusable components like `AdminRoute` for protecting admin routes and `PrivateRoute` for protecting authenticated routes.

- **/contexts**: Contains the Context API logic for authentication using `AuthContext`. This helps in managing global authentication states like user login, logout, and authentication check.

- **/helpers**: Houses utility functions such as converting exam titles to URL-friendly slugs.

- **/layouts**: Contains layout components such as `DefaultLayoutAdmin.js` that define how admin pages are structured with navigation, sidebar, etc.

- **/pages**: This folder contains the actual pages or views of the app. Each file inside `/pages` corresponds to a route in the app.

  - **Admin**: Admin-related pages, like managing exams, users, and feedback.
  - **ChangePassword**: Allows users to change their passwords.
  - **Contact**: The contact page for the app.
  - **DetailExam**: Shows detailed information about a selected exam.
  - **Home**: The homepage of the app.
  - **Leaderboard**: Displays a leaderboard of user scores for various quizzes.
  - **ListExams**: Displays a list of available quizzes, allows filtering by subject and level.
  - **Login**: Page for users to log in.
  - **Profile**: The user's profile page where they can view and update their personal info.
  - **Register**: Page for user registration.
  - **Transcript**: Displays the user's past quiz attempts and scores.

- **App.js**: The main React component that controls the flow of the app.
- **firebase.js**: Configuration file for Firebase services (if applicable).
- **index.js**: The entry point of the React application.

#### Project Configuration:

- **package.json**: Lists all the project dependencies (like React, React Router, Firebase, etc.) and scripts for running, building, and testing the app.
- **.gitignore**: Specifies which files and directories should be ignored by Git.
- **README.md**: The documentation for the project that explains how to set up and run the app.

## API Endpoints

The platform uses a mock backend via JSON server. Here are some of the key endpoints:

- **Users**: `GET /users`
- **Exams**: `GET /exams`
- **Histories**: `GET /histories`
- **Leaderboards**: `GET /leaderboards`

To interact with these endpoints, the frontend makes use of `fetch` requests.

## Authentication

- **Login**: Users can log in using email and password, or via Google and Facebook authentication.
- **Register**: Users can create a new account with email and password.
- **Protected Routes**: Certain routes (e.g., Profile, Leaderboards) are protected and can only be accessed when logged in.

## Contributing

Feel free to submit issues or pull requests. When contributing:

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

This version of the `README.md` includes detailed descriptions of the features in your project. Adjust and expand based on any additional functionalities.
