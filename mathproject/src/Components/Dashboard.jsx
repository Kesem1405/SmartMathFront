import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CurrentProgress from "./CurrentProgress";
import Notebook from "./Notebook";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Dashboard.css";
import MathDisplay from "./MathDisplay.jsx";
import {topicTranslations} from "./Constants.js";
import DashboardTour from "./DashboardTour.jsx";


function Dashboard() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(() => parseInt(localStorage.getItem("score")) || 0);
    const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak")) || 0);
    const [difficulty, setDifficulty] = useState("EASY");
    const [topic, setTopic] = useState("AddSub");
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [animationTrigger, setAnimationTrigger] = useState(0);
    const isSeenTutorial = localStorage.getItem("hasSeenTour")


    useEffect(() => {
        if (!localStorage.getItem("userToken")) {
            navigate("/auth");
        } else {
            fetchQuestion();
        }
    }, [navigate]);

    useEffect(() => {
        let interval;
        if (isTimerRunning && isSeenTutorial) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning], isSeenTutorial);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/question/generate?token=${token}`);
            setCurrentQuestion(response.data);
            setDifficulty(response.data.difficulty);
            setTopic(topicTranslations[response.data.topic] || response.data.topic);
            setTimer(0);
            setIsTimerRunning(true);
        } catch (err) {
            setError(err.response?.data || "שגיאה בטעינת שאלה");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        setIsTimerRunning(false);

        if (!currentQuestion || !userAnswer.trim()) return;

        const token = localStorage.getItem("userToken");
        const numericAnswer = parseInt(userAnswer, 10);
        if (isNaN(numericAnswer)) {
            console.error("Invalid answer: not a number");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/question/submit',
                {},
                {
                    params: {
                        token: token,
                        userAnswer: numericAnswer
                    }
                }
            );

            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error submitting answer to server:', error);
        }

        const isCorrect = numericAnswer === currentQuestion.correctAnswer;
        setFeedback(isCorrect ? "תשובה נכונה! 🎉" : ` תשובה שגויה, התשובה הנכונה היא: ${currentQuestion.correctAnswer}`);

        if (isCorrect) {
            const newScore = score + 1;
            const newStreak = streak + 1;
            setScore(newScore);
            setStreak(newStreak);
            localStorage.setItem("score", newScore);
            localStorage.setItem("streak", newStreak);

            if (newStreak >= 3 && difficulty !== "HARD") {
                setDifficulty(prev => prev === "EASY" ? "MEDIUM" : "HARD");
            }
        } else {
            setStreak(0);
            localStorage.setItem("streak", 0);
        }

        setShowFeedbackModal(true);
        setUserAnswer("");


        setAnimationTrigger(prev => prev + 1);
        fetchQuestion();
    };


    return (
        <div className="dashboard-layout">
            <DashboardTour />
            <CurrentProgress topic={topic} difficulty={difficulty}/>

            <div className="main-content">
                <Navbar handleSignOut={() => {
                    localStorage.removeItem("userToken");
                    navigate("/auth");
                }}/>

                <div className="content-area">
                    <div className="question-container">
                        {loading && <div className="loading-spinner"></div>}
                        {error && <div className="error-alert">{error}</div>}
                        {!error && <div className="question-text">פתור את התרגיל הבא : </div>}
                        {currentQuestion && (
                            <>
                                <MathDisplay
                                    expression={currentQuestion.context}
                                    triggerAnimation={animationTrigger}
                                />
                            </>
                        )}
                    </div>

                    <div className="stats-and-button-container">
                        <div className="stats-bar">
                            <div> ✅ : {score} </div>
                            <div> רצף : {streak} </div>
                            <div> ⏱️ : {timer} שניות</div>
                        </div>

                        <div className="answer-input">
                            <input
                                className={"user-input"}
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="הכנס תשובה"
                            />
                            <button className="submit-button" onClick={handleSubmitAnswer}>שלח</button>
                        </div>
                    </div>

                    <Notebook/>
                </div>
            </div>

            <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>תוצאה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={`${feedback.includes("שגויה") ? "text-danger" : "text-success"}`}>
                        {feedback}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Dashboard;