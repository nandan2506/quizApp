import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  document.title="result"
  const location = useLocation();
  const navigate = useNavigate();

  const { result } = location.state || {};

  if (!result)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">No result found</h1>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );

  const correct = result.details.filter((d) => d.correct).length;
  const skipped = result.details.filter((d) => d.userAnswer === null).length;
  const wrong = result.total - correct - skipped;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Result</h1>

      <h2 className="text-xl mb-2">
        Score: {result.score} / {result.total} (
        {((result.score / result.total) * 100).toFixed(2)}%)
      </h2>

      <p>✅ Correct: {correct}</p>
      <p>❌ Wrong: {wrong}</p>
      <p>⚪ Skipped: {skipped}</p>

      <hr className="my-4 w-full max-w-2xl" />

      <div className="w-full max-w-2xl">
        {result.details.map((d, i) => {
          const userAnswerText =
            d.userAnswer !== null ? d.options[d.userAnswer] : "Not Attempted";
          const correctAnswerText = d.options[d.correctAnswer];

          let bgColor = "#f8d7da"; // wrong
          if (d.userAnswer === null) bgColor = "#fff3cd"; // skipped
          else if (d.correct) bgColor = "#d4edda"; // correct

          return (
            <div
              key={i}
              className="border p-4 mb-3 rounded-lg"
              style={{ backgroundColor: bgColor }}
            >
              <p>
                <strong>Q{i + 1}:</strong> {d.text}
              </p>
              <p>
                Your Answer: <strong>{userAnswerText}</strong>
              </p>
              <p>
                Correct Answer: <strong>{correctAnswerText}</strong>
              </p>
              {d.correct ? (
                <p className="text-green-700 font-semibold">✅ Correct</p>
              ) : d.userAnswer === null ? (
                <p className="text-orange-700 font-semibold">⚪ Skipped</p>
              ) : (
                <p className="text-red-700 font-semibold">❌ Wrong</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
      <button
        onClick={() => navigate("/quiz")}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Retake Quiz
      </button>
    </div>
  );
}
