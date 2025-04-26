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

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`http://localhost:8080/api/admin/chart-data?token=${token}`);
            setChartData(response.data);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        } finally {
            setLoading(false);
        }
    };

    const createPieChartData = (data) => ({
        labels: Object.keys(data),
        datasets: [{
            data: Object.values(data),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 20
        }]
    });

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14 }
                }
            },
            tooltip: { enabled: true }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="chart-panel">
            {loading ? (
                <div className="text-center">
                    <p>טוען נתונים...</p>
                </div>
            ) : (
                <div className="charts-container">
                    <div className="chart">
                        <h4>התפלגות משתמשים לפי קבוצות</h4>
                        <div style={{ height: '300px' }}>
                            <Pie
                                data={createPieChartData(chartData.clusterDistribution)}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                    <div className="chart">
                        <h4>התפלגות נושאים נוכחיים</h4>
                        <div style={{ height: '300px' }}>
                            <Pie
                                data={createPieChartData(chartData.topicDistribution)}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                    <div className="chart">
                        <h4>שיעורי הצלחה לפי נושא</h4>
                        <div style={{ height: '300px' }}>
                            <Pie
                                data={createPieChartData(chartData.successRates)}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChartPanel;