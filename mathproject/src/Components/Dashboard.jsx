import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [countMistake, setCountMistake] = useState(0);

    useEffect(() => {
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
                setFeedbackMessage("");
                setCountMistake(0);
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
        } else {
            setCountMistake(countMistake+1);
            setFeedbackMessage("Wrong answer. Try again!");
        }
        setUserAnswer("");
    };

    return (
        <div>
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
                {feedbackMessage && (
                    <div className="mt-3">
                        <p className={feedbackMessage === "Correct answer!" ? "text-success" : "text-danger"}>
                            {feedbackMessage}
                        </p>
                    </div>
                )}
                <div className="mt-3">
                    <h5>Number of mistake in the exercise: {countMistake}</h5>
                    <h5>Score: {score}</h5>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
