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
import { topicTranslations } from "./Constants.js";
import DashboardTour from "./DashboardTour.jsx";
import StreakCelebration from "./StreakCelebration";


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
    const [personalizedMessage, setPersonalizedMessage] = useState("");
    const isSeenTutorial = localStorage.getItem("hasSeenTour");
    const [showStreakCelebration, setShowStreakCelebration] = useState(false);


    useEffect(() => {
        if (!localStorage.getItem("userToken")) {
            navigate("/auth");
        } else {
            fetchQuestion();
            fetchPersonalizedMessage();
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
    }, [isTimerRunning, isSeenTutorial]);

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

    const fetchPersonalizedMessage = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/user/behavior?token=${token}`);
            const clusterId = response.data.clusterId;
            if (clusterId === 0) {
                if (successRateAddSub < 0.7) {
                    setPersonalizedMessage("בואו נתרגל חיבור וחיסור כדי לבנות בסיס חזק!");
                } else if (successRateMultDev < 0.7) {
                    setPersonalizedMessage("כל הכבוד! עכשיו נתמקד בכפל וחילוק.");
                } else {
                    setPersonalizedMessage("אתה מוכן לאתגר? ננסה משוואות!");
                }
            } else if (clusterId === 1) {
                if (successRateAddSub < 0.7) {
                    setPersonalizedMessage("חזרה על חיבור וחיסור תעזור לך להתקדם!");
                } else if (successRateMultDev < 0.7) {
                    setPersonalizedMessage("מעולה! בוא נתרגל כפל וחילוק.");
                } else {
                    setPersonalizedMessage("אתה מתקדם! נתחיל עם משוואות.");
                }
            } else if (clusterId === 2) {
                if (successRateMultDev < 0.7) {
                    setPersonalizedMessage("נחזק את הכפל והחילוק לפני משוואות.");
                } else {
                    setPersonalizedMessage("מדהים! בוא נפתור משוואות מתקדמות!");
                }
            }
        } catch (err) {
            console.error("Error fetching personalized message:", err);
            setPersonalizedMessage("בואו נתרגל כדי להתקדם!");
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
            if (newStreak % 5 === 0) {
                setShowStreakCelebration(true);
            }
            if (newStreak >= 3 && difficulty !== "HARD") {
                setDifficulty(prev => prev === "EASY" ? "MEDIUM" : "HARD");
            }
        } else {
            setStreak(0);
            localStorage.setItem("streak", 0);
            setShowStreakCelebration(false);
        }

        setShowFeedbackModal(true);
        setUserAnswer("");
        setAnimationTrigger(prev => prev + 1);
        fetchQuestion();
        fetchPersonalizedMessage();
    };

    return (
        <div className="dashboard-layout">
            <DashboardTour />
            <CurrentProgress topic={topic} difficulty={difficulty} />

            <div className="main-content">
                <Navbar handleSignOut={() => {
                    localStorage.removeItem("userToken");
                    navigate("/auth");
                }} />

                <div className="content-area">
                    <div className="personalized-message">{personalizedMessage}</div>

                    {/* Centered Question Area */}
                    <div className="question-board">
                        <div className="question-container">
                            {loading && <div className="loading-spinner"></div>}
                            {error && <div className="error-alert">{error}</div>}
                            {!error && <div className="question-text">פתור את התרגיל הבא : </div>}
                            {currentQuestion && (
                                <MathDisplay
                                    expression={currentQuestion.context}
                                    triggerAnimation={animationTrigger}
                                />
                            )}
                        </div>

                        <div className="answer-section">
                            <div className="stats-bar">
                                <div> ✅ : {score} </div>
                                <div> רצף : {streak} </div>
                                <div> ⏱️ : {timer} שניות</div>
                            </div>

                            <div className="answer-input">
                                <input
                                    className="user-input"
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="הכנס תשובה"
                                />
                                <button className="submit-button" onClick={handleSubmitAnswer}>שלח תשובה</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marginal Notebook */}
                <Notebook />
            </div>
            <StreakCelebration
                streak={streak}
                show={showStreakCelebration}
                onHide={() => setShowStreakCelebration(false)}
            />

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