import "./App.css";
import Home from "./pages/homePage/Home";
import Result from "./pages/resultPage/ResultPage";
import Quiz from "./pages/quizPage/QuizPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
