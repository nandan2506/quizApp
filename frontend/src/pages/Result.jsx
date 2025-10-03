import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // result data passed from Quiz.jsx
  const { result } = location.state || {};
  console.log(result);

  if (!result) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>No result found</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Go Home
        </button>
      </div>
    );
  }

  // calculate summary
  const correct = result.details.filter((d) => d.correct).length;
  const skipped = result.details.filter((d) => d.userAnswer === null).length;
  const wrong = result.total - correct - skipped;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>📊 Quiz Result</h1>

      <div
        style={{
          textAlign: "center",
          padding: "15px",
          borderRadius: "10px",
          background: "#f4f6f8",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "10px 0" }}>
          Score:{" "}
          <span style={{ color: "#007bff" }}>
            {result.score} / {result.total}
          </span>{" "}
          ({((result.score / result.total) * 100).toFixed(2)}%)
        </h2>

        <p>✅ Correct: <b style={{ color: "green" }}>{correct}</b></p>
        <p>❌ Wrong: <b style={{ color: "red" }}>{wrong}</b></p>
        <p>⚪ Skipped: <b style={{ color: "orange" }}>{skipped}</b></p>
      </div>

      <hr />

      {/* Question Details */}
      <div>
        {result.details.map((d, i) => {
          const userAnswerText =
            d.userAnswer !== null ? d.options[d.userAnswer] : "Not Attempted";
          const correctAnswerText = d.options[d.correctAnswer];

          let bgColor = "#f8d7da"; // red = wrong
          if (d.userAnswer === null) bgColor = "#fff3cd"; // yellow = skipped
          else if (d.correct) bgColor = "#d4edda"; // green = correct

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "8px",
                backgroundColor: bgColor,
              }}
            >
              <p>
                <strong>Q{i + 1}:</strong> {d.text}
              </p>
              <p>
                Your Answer:{" "}
                <b style={{ color: d.correct ? "green" : "red" }}>
                  {userAnswerText}
                </b>
              </p>
              <p>
                Correct Answer: <b>{correctAnswerText}</b>
              </p>
              {d.correct ? (
                <p style={{ color: "green" }}>✅ Correct</p>
              ) : d.userAnswer === null ? (
                <p style={{ color: "orange" }}>⚪ Skipped</p>
              ) : (
                <p style={{ color: "red" }}>❌ Wrong</p>
              )}
            </div>
          );
        })}
      </div>

      <hr />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Go Home
        </button>

        {/* <button
          onClick={() => navigate(0)} 
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
        </button> */}
      </div>
    </div>
  );
}
