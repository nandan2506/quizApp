import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  document.title="home"

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">📘 Welcome to Quiz</h1>
      <button
        className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}
