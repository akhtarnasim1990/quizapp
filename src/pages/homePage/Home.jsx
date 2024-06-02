import "./Home.css";
import dp from "../../assets/images/user-profile-dp.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-main-container">
      <div className="home-main-body">
        <div className="bg-white">
          <div className="home-main-content">
            <div className="home-welcome-card">
              <div className="user-dp">
                <img src={dp} alt="#" style={{ width: "100px" }} />
              </div>
              <div className="welcome-text">Welcome</div>
              <div className="quiz-start-text">To start quiz click on start button.</div>
            </div>
            <div className="start-button">
              <button onClick={() => navigate("/quiz")}>Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
