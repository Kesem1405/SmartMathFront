import 'react';
import { FaCalculator, FaTrophy, FaChartLine } from 'react-icons/fa';
import '../css/CurrentProgress.css';
import {useEffect, useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function CurrentProgress({ topic = "AddSub", difficulty = "EASY" }) {
    const [firstName, setFirstName] = useState("");

    const difficultyLevels = {
        'EASY': { value: 1, color: '#28a745', label: 'מתחיל' },
        'MEDIUM': { value: 2, color: '#ffc107', label: 'בינוני' },
        'HARD': { value: 3, color: '#dc3545', label: 'מתקדם' }
    };


    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return;
        }

        axios.get(`http://localhost:8080/api/user/info`, {
            params: { token }
        })
            .then((response) => {
                if (response.data) {
                    setFirstName(response.data.firstName);
                }
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
                if (error.response?.status === 404) {
                } else {
                }
            });
    }, []);

    const currentLevel = difficultyLevels[difficulty] || difficultyLevels['EASY'];

    return (
        <div className="sidebar-progress">
            <div className="sidebar-header">
                <FaCalculator className="sidebar-icon" />
                <h3> שלום  {firstName}</h3>
            </div>

            <div className="progress-section">
                <div className="difficulty-info">
                    <FaChartLine className="me-2" />
                    <span> נושא : {topic}</span>
                </div>

                <div className="progress-display">
                    <div className="progress-labels">
                        <span className="difficulty-label">{currentLevel.label}</span>
                        {difficulty === 'HARD' && <FaTrophy className="trophy-icon"/>}
                        <span> : רמת קושי</span>
                    </div>

                    <div className="progress-bar-container">
                        <div
                            className="progress-fill"
                            style={{
                                height: `${(currentLevel.value / 3) * 100}%`,
                                backgroundColor: currentLevel.color
                            }}
                        ></div>
                    </div>

                    <div className="level-indicator">
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentProgress;