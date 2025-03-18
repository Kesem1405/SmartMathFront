import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../App.css';
import { Modal } from "react-bootstrap";
import Notebook from "./Notebook.jsx"; // Import the Notebook component

function Dashboard() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(() => parseInt(localStorage.getItem("score")) || 0);
    const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak")) || 0);
    const [difficulty, setDifficulty] = useState("EASY");
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
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            setError(null);
    
            const token = localStorage.getItem("userToken");
    
            const response = await axios.get(`http://localhost:8080/api/question/generate?token=${token}`, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            setCurrentQuestion(response.data);
            setDifficulty(response.data.difficulty);
            setTimer(0);
            setIsTimerRunning(true);
        } catch (err) {
            console.error("Error fetching question:", err);
            setError(err.response?.data || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmitAnswer = () => {
        setIsTimerRunning(false);

        if (!currentQuestion || !userAnswer.trim()) {
            setFeedback("Please enter an answer before submitting.");
            return;
        }

        const correctAnswer = parseInt(currentQuestion.correctAnswer, 10);
        const userAnswerNumber = parseInt(userAnswer, 10);

        if (userAnswerNumber === correctAnswer) {
            setFeedback("Correct! Well done.");
            const newScore = score + 1;
            const newStreak = streak + 1;

            setScore(newScore);
            setStreak(newStreak);
            localStorage.setItem("score", newScore);
            localStorage.setItem("streak", newStreak);

            // Update difficulty based on streak
            if (newStreak >= 3) {
                let newDifficulty;
                switch (difficulty) {
                    case "EASY":
                        newDifficulty = "MEDIUM";
                        break;
                    case "MEDIUM":
                        newDifficulty = "HARD";
                        break;
                    default:
                        newDifficulty = difficulty; // Stay at HARD if already at the highest level
                        break;
                }
                setDifficulty(newDifficulty);
            }
        } else {
            setFeedback(`Incorrect! The correct answer was ${correctAnswer}.`);
            setStreak(0);
            localStorage.setItem("streak", 0);
        }

        setUserAnswer("");
        setShowFeedbackModal(true);
        fetchQuestion();  // Continue fetching question even if the answer is incorrect
    };

    const handleCloseModal = () => {
        setShowFeedbackModal(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("score");
        localStorage.removeItem("streak");
        navigate("/auth");
    };

    const handleClearNotebook = () => {
        // This function is called when the notebook is cleared
        console.log("Notebook cleared");
    };

    return (
        <div>
            <Navbar handleSignOut={handleSignOut} />
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card shadow-lg p-4">
                            <p className="text-
                            .secondary text-center mb-2">Current Difficulty: <strong>{difficulty}</strong></p>
                            <h2 className="text-center mb-3">Math Questions</h2>
                            <p className="text-center text-secondary mb-3">Score: {score} | Streak: {streak} | Time: {timer}s</p>
                            {loading && <div className="text-center">Loading question...</div>}
                            {error && <div className="text-danger text-center">Error: {error}</div>}
                            {currentQuestion && (
                                <div>
                                    <h4 className="text-center mb-3">{currentQuestion.context}</h4>
                                    <div className="input-group my-3">
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={handleAnswerChange}
                                            className="form-control"
                                            placeholder="Enter your answer"
                                        />
                                        <button onClick={handleSubmitAnswer} className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                    {feedback && (
                                        <div className={`text-center mt-3 ${feedback.includes("Correct") ? "text-success" : "text-danger"}`}>
                                            {feedback}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Notebook onClear={handleClearNotebook} />
                    </div>
                </div>
            </div>
            <Modal show={showFeedbackModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Answer Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{feedback}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Dashboard;