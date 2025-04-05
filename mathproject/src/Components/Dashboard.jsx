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

    useEffect(() => {
        if (!localStorage.getItem("userToken")) {
            navigate("/auth");
        } else {
            fetchQuestion();
        }
    }, [navigate]);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/question/generate?token=${token}`);
            setCurrentQuestion(response.data);
            setDifficulty(response.data.difficulty);
            setTopic(response.data.topic);
            setTimer(0);
            setIsTimerRunning(true);
        } catch (err) {
            setError(err.response?.data || "שגיאה בטעינת שאלה");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = () => {
        setIsTimerRunning(false);
        if (!currentQuestion || !userAnswer.trim()) return;

        const isCorrect = parseInt(userAnswer) === currentQuestion.correctAnswer;
        setFeedback(isCorrect ? "תשובה נכונה! 🎉" : `תשובה לא נכונה. התשובה הנכונה: ${currentQuestion.correctAnswer}`);

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
        fetchQuestion();
    };

    return (
        <div className="dashboard-layout">
            <CurrentProgress topic={topic} difficulty={difficulty}/>

            <div className="main-content">
                <Navbar handleSignOut={() => {
                    localStorage.removeItem("userToken");
                    navigate("/auth");
                }}/>

                <div className="content-area">
                    <div className="question-container">
                        <div className="stats-bar">
                            <span>ניקוד: {score}</span>
                            <span>רצף: {streak}</span>
                            <span>זמן: {timer} שניות</span>
                        </div>

                        {loading && <div className="loading-spinner"></div>}
                        {error && <div className="error-alert">{error}</div>}

                        {currentQuestion && (
                            <>
                                <MathDisplay expression={currentQuestion.context} />
                                <div className="answer-input">
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="הכנס תשובה"
                                    />
                                    <button onClick={handleSubmitAnswer}>שלח</button>
                                </div>
                            </>
                        )}
                    </div>

                    <Notebook/>
                </div>
            </div>

            <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>תוצאה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={feedback.includes("נכונה") ? "text-success" : "text-danger"}>
                        {feedback}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Dashboard;