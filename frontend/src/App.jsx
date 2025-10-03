import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Quiz = lazy(() => import("./pages/Quiz"));
const Result = lazy(() => import("./pages/Result"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
