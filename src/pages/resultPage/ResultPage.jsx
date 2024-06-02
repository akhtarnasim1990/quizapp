import "./ResultPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location", location);

  return (
    <div className="result-main-container">
      <div className="result-main-body">
        <div className="bg-blue">
          <div className="result-content">
            <div className="congartulation-text">
              <span>{location.state.marks >= location.state.passmark ? "Congratulation!" : "Opps!"}</span>
              <span>You got.</span>
              <span>{location.state.marks}%</span>
            </div>
            <div className="restart-btn">
              <button onClick={() => navigate("/quiz")}>Re start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
