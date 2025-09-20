📝 Online Quiz Portal
📌 Overview

The Online Quiz Portal is a web-based application that allows users to register, log in, and take quizzes online. It provides an interactive interface for answering multiple-choice questions and displays the final score at the end. This project demonstrates front-end web development skills using HTML, CSS, and JavaScript.

🚀 Features

🔑 User Authentication – Registration and login pages.

🎯 Quiz Module – Users can attempt multiple-choice quizzes with dynamic flow.

📊 Result Display – Final score displayed after quiz completion.

🎨 Responsive UI – Clean and user-friendly design.

📂 Modular Code – Separate files for HTML, CSS, and JavaScript.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Editor Used: VS Code

📂 Project Structure
Online-Quiz-Portal/
│
├── index.html        # Homepage  
├── login.html        # Login page  
├── register.html     # User registration page  
├── student.html      # Student quiz page  
├── style.css         # Styling  
├── script.js         # Quiz logic  
└── README.md         # Documentation  

⚙️ How to Run

Clone the repository:

git clone https://github.com/Rajsharma672/Online-Quiz-Portal.git


Open the folder in VS Code or any code editor.

Run index.html in a browser.

Register/Login and start the quiz.

📊 System Architecture

Here’s a simple diagram of the workflow:

flowchart TD
    A[User] --> B[Login / Register Page]
    B -->|Valid User| C[Student Quiz Page]
    B -->|Invalid User| D[Error Message]
    C --> E[Answer Questions]
    E --> F[Submit Quiz]
    F --> G[Display Results]
