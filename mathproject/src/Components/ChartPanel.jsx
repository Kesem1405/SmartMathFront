import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../css/ChartPanel.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPanel() {
    const [chartData, setChartData] = useState({
        clusterDistribution: {},
        topicDistribution: {},
        successRates: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentChartIndex, setCurrentChartIndex] = useState(0);

    // Chart titles and descriptions
    const chartInfo = [
        {
            title: "התפלגות משתמשים לפי קבוצות",
            description: "מציג את החלוקה של המשתמשים בין הקבוצות השונות במערכת."
        },
        {
            title: "התפלגות נושאים נוכחיים",
            description: "מציג את התפלגות הנושאים שבהם משתמשים עוסקים כרגע."
        },
        {
            title: "שיעורי הצלחה לפי נושא",
            description: "מציג את אחוזי ההצלחה של משתמשים לפי נושאי הלמידה."
        }
    ];

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/admin/chart-data?token=${token}`);
            setChartData(response.data);
        } catch (error) {
            console.error("Error fetching chart data:", error);
            setError("Failed to load chart data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const createPieChartData = (data) => ({
        labels: Object.keys(data),
        datasets: [{
            data: Object.values(data),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56',
                '#4BC0C0', '#9966FF', '#FF9F40',
                '#8AC24A', '#FF6B6B', '#47B8E0'
            ],
            hoverOffset: 20
        }]
    });

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: { size: 12 },
                    boxWidth: 12,
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    const nextChart = () => {
        setCurrentChartIndex((prevIndex) =>
            prevIndex === chartInfo.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevChart = () => {
        setCurrentChartIndex((prevIndex) =>
            prevIndex === 0 ? chartInfo.length - 1 : prevIndex - 1
        );
    };

    const getCurrentChartData = () => {
        switch(currentChartIndex) {
            case 0: return chartData.clusterDistribution;
            case 1: return chartData.topicDistribution;
            case 2: return chartData.successRates;
            default: return {};
        }
    };

    return (
        <div className="chart-panel">
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>טוען נתונים...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={fetchChartData} className="retry-button">
                        נסה שוב
                    </button>
                </div>
            ) : (
                <div className="chart-container">
                    <div className="chart-header">
                        <h3>{chartInfo[currentChartIndex].title}</h3>
                        <p className="chart-description">{chartInfo[currentChartIndex].description}</p>
                    </div>

                    <div className="chart-wrapper">
                        <div style={{ height: '400px', width: '100%' }}>
                            <Pie
                                data={createPieChartData(getCurrentChartData())}
                                options={chartOptions}
                            />
                        </div>
                    </div>

                    <div className="chart-navigation">
                        <button onClick={prevChart} className="nav-button">
                            &lt; הקודם
                        </button>
                        <div className="chart-indicators">
                            {chartInfo.map((_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${index === currentChartIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentChartIndex(index)}
                                />
                            ))}
                        </div>
                        <button onClick={nextChart} className="nav-button">
                            הבא &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChartPanel;