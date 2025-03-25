import React from 'react';
import { FaCalculator, FaTrophy, FaChartLine } from 'react-icons/fa';
import 'mathproject/src/CurrentProgress.css';

function CurrentProgress({ topic = "AddSub", difficulty = "EASY" }) {
    const difficultyLevels = {
        'EASY': { value: 1, color: '#28a745', label: 'מתחיל' },
        'MEDIUM': { value: 2, color: '#ffc107', label: 'בינוני' },
        'HARD': { value: 3, color: '#dc3545', label: 'מתקדם' }
    };

    const currentLevel = difficultyLevels[difficulty] || difficultyLevels['EASY'];

    return (
        <div className="sidebar-progress">
            <div className="sidebar-header">
                <FaCalculator className="sidebar-icon" />
                <h3>SmartMath</h3>
            </div>

            <div className="progress-section">
                <div className="difficulty-info">
                    <FaChartLine className="me-2" />
                    <span>נושא: {topic}</span>
                </div>

                <div className="progress-display">
                    <div className="progress-labels">
                        <span>רמת קושי:</span>
                        <span className="difficulty-label">{currentLevel.label}</span>
                        {difficulty === 'HARD' && <FaTrophy className="trophy-icon" />}
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