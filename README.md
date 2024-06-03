# Quiz Web App

## Overview

This is a responsive quiz web application built with React. It consists of three main pages: the Home page, Quiz page, and Result page. The application is designed to provide a smooth user experience with animations and randomization of questions and answers. The key libraries used in this project are `react-router-dom` for routing and `react-icons` for icons.

## Features

- **Three Pages**: Home, Quiz, and Result.
- **Responsive Design**: Optimized for various screen sizes.
- **Randomization**: Questions and answers are randomly populated on each attempt.
- **Animations**: Added animations to the Quiz page for a better user experience.
- **Reattempts**: On reattempting, the Quiz page reloads without refreshing the questions and answers.

## Pages

### 1. Home Page

- The landing page of the application.
- Provides an introduction and a start button to begin the quiz.

### 2. Quiz Page

- Displays the quiz questions and answer options.
- Questions and answers are randomized for each attempt.
- Includes animations for enhanced user interaction.
- Tracks the user's selected answers and calculates the score.

### 3. Result Page

- Displays the user's score and performance after completing the quiz.
- Provides an option to reattempt the quiz.

## Libraries Used

- **react-router-dom**: For routing between different pages.
- **react-icons**: For adding icons to enhance the UI.

## Note on Data Fetching

- Although the current implementation uses static JSON data for questions and answers, the application is designed to follow a pattern suitable for fetching data from a real database.
- This approach ensures that the application can be easily adapted to dynamic data sources, providing scalability and flexibility for future enhancements.

## Setup and Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/akhtarnasim1990/quizapp.git
   cd quizapp
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Application**

   ```sh
   npm start
   ```

4. **Build the Application**
   ```sh
   npm run build
   ```

## Usage

- **Navigate to Home Page**: Start the quiz by clicking the start button.
- **Quiz Page**: Answer the questions by selecting the options. The progress bar indicates your progress. Click "Next" or "Previous" to navigate through the questions.
- **Result Page**: View your score and performance. Click the reattempt button to take the quiz again with new random questions and answers.

## Additional Information

- **Responsive Design**: The app is designed to be fully responsive, providing a seamless experience on both desktop and mobile devices.
- **Randomization Logic**: The randomization ensures a unique quiz experience on each attempt by shuffling questions and answer options.
- **Animations**: Enhances the user experience on the Quiz page.
