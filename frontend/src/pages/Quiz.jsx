import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const Question = lazy(() => import("../components/Question"));

export default function Quiz() {
const baseApi = import.meta.env.VITE_BASE_API;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQues, setCurrQues] = useState(0);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // fetch questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseApi}/quiz/allQuestions`);
        const data = await res.json();
        setQuestions(data.questions);
      } catch (error) {
        console.log("error while getting questions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // timer
  useEffect(() => {
    if (!started) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const handleAnswer = useCallback((qid, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qid]: optIndex }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`${baseApi}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      navigate("/result", { state: { result: data } });
    } catch (error) {
      console.log("Error submitting quiz:", error);
    } finally {
      setSubmitting(false);
    }
  }, [answers, navigate]);

  if (loading) return <h1 className="text-center text-xl">Loading...</h1>;

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-700">📘 Welcome to Quiz</h1>
        <button
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          onClick={() => {
            setStarted(true);
            setCurrQues(0);
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentQues];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Timer */}
      <div className="mb-4">
        <span className="px-4 py-2 bg-yellow-200 text-black rounded-lg text-lg font-semibold shadow">
          ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Question navigation buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {questions.map((_, i) => {
          let bg =
            i === currentQues
              ? "bg-green-500 text-white"
              : answers[questions[i]._id] !== undefined
              ? "bg-green-200 text-black"
              : "bg-gray-200 text-black";
          return (
            <button
              key={i}
              className={`w-10 h-10 rounded-full border ${bg} font-semibold`}
              onClick={() => setCurrQues(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl animate-fade-in">
        <Suspense fallback={<h2>Loading Question...</h2>}>
          <Question
            ques={q}
            selected={answers[q._id]}
            onSelect={(optIndex) => handleAnswer(q._id, optIndex)}
          />
        </Suspense>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6 w-full max-w-2xl">
        <button
          disabled={currentQues === 0}
          onClick={() => setCurrQues((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Previous
        </button>

        {currentQues === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={() => setCurrQues((prev) => prev + 1)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
