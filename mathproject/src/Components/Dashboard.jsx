import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Dashboard({ handleSignOut }) {
    const [currentQuestion, setCurrentQuestion] = useState(null); // Current question
    const [userAnswer, setUserAnswer] = useState(""); // User's answer
    const [score, setScore] = useState(0); // User's score

    useEffect(() => {
        // Fetch the first question when the component mounts
        fetchQuestion();
    }, [score]);

    const fetchQuestion = () => {
        let difficulty = 1;
        if (score >= 10 && score <= 19) {
            difficulty = 2;
        } else if (score >= 20) {
            difficulty = 3;
        }

        axios
            .get(`http://localhost:8080/user/math/generate-question/${difficulty}`)
            .then((response) => {
                setCurrentQuestion(response.data);
            })
            .catch((error) => {
                console.error("Error fetching question:", error);
            });
    };

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmitAnswer = () => {
        if (parseInt(userAnswer) === currentQuestion.answer) {
            setScore(score + 1);
        }
        // Fetch the next question
        fetchQuestion();
        setUserAnswer("");
    };

    return (
        <div>
            <Navbar handleSignOut={handleSignOut} />
            <div className="container mt-5">
                <h2>Math Questions</h2>
                {currentQuestion && (
                    <div>
                        <h4>{currentQuestion.question}</h4>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={handleAnswerChange}
                            placeholder="Answer"
                        />
                        <button onClick={handleSubmitAnswer} className="btn btn-primary">
                            Submit Answer
                        </button>
                    </div>
                )}
                <div className="mt-3">
                    <h5>Score: {score}</h5>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
