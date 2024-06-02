import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuizPage.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const QuizPage = () => {
  const [jsonData, setJsonData] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [marks, setMarks] = useState(0);
  const [slides, setSlides] = useState("slide-from-right");
  const [showRightSlideBtn, setShowRightSlideBtn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let questionsData = localStorage.getItem("questionsData");
    const fetchData = async () => {
      try {
        const response = await fetch("../../assets/questions.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const shuffleQA = shuffleHandler(data);
        localStorage.setItem("questionsData", JSON.stringify(shuffleQA));
        console.log(shuffleQA);
        setJsonData(shuffleQA);
        setTotalQuestions(shuffleQA.questions.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (questionsData) {
      questionsData = JSON.parse(questionsData);
      const shuffleQA = shuffleHandler(questionsData);
      setJsonData(shuffleQA);
      setTotalQuestions(shuffleQA.questions.length);
    } else {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    if (questionNumber === totalQuestions) {
      setTimeout(() => {
        navigate("/result", { state: { marks, passmark: jsonData.passmark } });
      }, 500);
      setSlides("slide-to-left");
    }
  }, [selectedAnswers]);

  const changeQuestion = (direction) => {
    let slid = direction > 0 ? "slide-to-left" : "slide-to-right";
    setTimeout(() => {
      slid = direction > 0 ? "slide-from-right" : "slide-from-left";
      setQuestionNumber((prevQuestionNumber) => {
        const newQuestionNumber = prevQuestionNumber + direction;
        // if (newQuestionNumber >= 1 && newQuestionNumber <= totalQuestions) {
        //   setShowRightSlideBtn(Object.keys(selectedAnswers).length >= newQuestionNumber);
        //   return newQuestionNumber;
        // }
        // setShowRightSlideBtn(Object.keys(selectedAnswers).length >= prevQuestionNumber);
        setShowRightSlideBtn(Object.keys(selectedAnswers).length >= newQuestionNumber);
        return newQuestionNumber;
      });
      setSlides(slid);
    }, 500);
    setSlides(slid);
  };

  const calculateProgress = () => {
    return (questionNumber / totalQuestions) * 100;
  };

  const formatNumberWithTrailingZero = (number) => {
    return number.toString().padStart(2, "0");
  };

  const handleOptionChange = (option) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = { ...prevSelectedAnswers, [questionNumber]: option.label };
      const previouslySelectedAnswer = prevSelectedAnswers[questionNumber];
      const previousIsCorrect = jsonData.questions[questionNumber - 1].options.find((opt) => opt.label === previouslySelectedAnswer)?.isCorrect;
      const newIsCorrect = option.isCorrect;

      if (previouslySelectedAnswer !== option.label) {
        if (previousIsCorrect) {
          setMarks(marks - 20);
        }
        if (newIsCorrect) {
          setMarks(marks + 20);
        }
      }

      return newSelectedAnswers;
    });
  };

  const selectAnswer = (option) => {
    changeQuestion(1);
    handleOptionChange(option);
  };

  const shuffleHandler = (data) => {
    const shuffleData = { ...data, questions: [...shuffleArray(data.questions)] };
    console.log(shuffleData);
    const shuffleQA = {
      ...shuffleData,
      questions: shuffleData.questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      })),
    };
    return shuffleQA;
  };

  const shuffleArray = (array) => {
    console.log("array", array);
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  if (!jsonData) {
    console.log(jsonData);
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-main-container">
      <div className="quiz-main-body">
        <div className="bg-white">
          <div className="quiz-header">
            <div className="quiz-btns-container">
              <button className="left-btn" disabled={questionNumber === 1} onClick={() => changeQuestion(-1)}>
                <FaChevronLeft />
              </button>

              <div className="left-btn">
                <span>{formatNumberWithTrailingZero(questionNumber)}</span>/{formatNumberWithTrailingZero(totalQuestions)}
              </div>
              {showRightSlideBtn ? (
                <button className="left-btn" disabled={questionNumber === totalQuestions} onClick={() => changeQuestion(1)}>
                  <FaChevronRight />
                </button>
              ) : (
                <div />
              )}
            </div>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-bar-active" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
          <div className={`quiz-question ${slides}`}>{jsonData.questions[questionNumber - 1].question}</div>
          <div className="quiz-answers">
            {jsonData.questions[questionNumber - 1].options.map((option, index) => (
              <div
                key={index}
                className={`answer-row ${selectedAnswers[questionNumber] === option.label ? "active" : ""} ${slides}`}
                onClick={questionNumber !== totalQuestions ? () => selectAnswer(option) : () => handleOptionChange(option)}
              >
                <span>{String.fromCharCode(97 + index)}</span>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
