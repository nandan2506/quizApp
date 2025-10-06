# 🧠 Quiz App

A full-stack **Quiz Application** built with **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
The app allows users to take timed quizzes, navigate between questions, auto-calculates scores with **negative marking (-0.25 for wrong answers)**, and displays results instantly.

---

## 🚀 Features

- Fetches dynamic quiz questions from the backend.
- Countdown timer with automatic submission on timeout.
- Question navigation buttons for quick access.
- Real-time score calculation with negative marking.
- Clean UI built using Tailwind CSS.
- Environment-based configuration (`.env`).

---

## 🧩 Tech Stack

**Frontend:**
- React (Vite)
- React Router
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nandan2506/quizApp.git
cd quizApp
```
### 2. Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
2. **Install dependencies:**
    ```bash
    npm install

3. **Create a .env file inside the backend folder:**
    ```bash
    PORT=8080
    MONGO_URI=your_mongodb_connection_string


4. **Start the backend server:**
    ```bash
     npm run start

**The backend should now be running at:**

    http://localhost:8080



### 3. Frontend Setup

1. **Open a new terminal and navigate to the frontend folder:**
    ```bash
    cd frontend


2. **Install dependencies:**
    ```bash
    npm install


3. **Start the frontend development server:**
    ```bash
    npm run dev


**The frontend should now be running at:**

    http://localhost:5173

---


### 💡 Assumptions and Design Choices

- Each question has a single correct option identified by its index (correctOpt).

- Unanswered questions are not penalized.

- Each incorrect answer deducts 0.25 marks.

- Timer is set to 2 minutes (120 seconds) per quiz.

- The backend endpoint /quiz/allQuestions returns data in the following format:
```json
{
  "questions": [
    {
      "_id": "64a123...",
      "text": "What is React?",
      "options": ["Library", "Framework", "Language", "IDE"],
      "correctOpt": 0
    }
  ]
}
```


### 🖼️ Folder Structure
```bash
quiz-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```
---


### 🎯 Example Workflow
    1. Start both backend and frontend servers.

    2. Open http://localhost:5173 in your browser.

    3. Click Start Quiz to begin.

    4. Answer questions, navigate freely, and submit before time ends.

    5. View detailed results instantly.


### ✅ Result Example:
    
    Total Questions: 10
    Correct: 7
    Incorrect: 2
    Unanswered: 1
    Final Score: 6.5
    
---

### 👨‍💻 Author

Nandan Singh Danu

Student | Full Stack Developer

Skills:  React, Node.js, Express, MongoDB, Tailwind CSS

### 📜 License

This project is licensed under the MIT License – feel free to use and modify it.

---


