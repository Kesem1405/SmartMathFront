import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    CircularProgress,
    Paper,
    Typography,
    Divider,
    Grid,
    Card,
    CardContent,
    Button,
    TextField
} from "@mui/material";

function Profile() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        id: 0
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [progressData, setProgressData] = useState(null);
    const [topicStats, setTopicStats] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const translateTopicName = (topicName) => {
        const translations = {
            'ADD_SUB': 'חיבור וחיסור',
            'MULT_DEV': 'כפל וחילוק',
            'EQ': 'משוואות ישר'
        };
        return translations[topicName] || topicName;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error("No authentication token found");
                }


                const userResponse = await axios.get(`http://localhost:8080/api/user/info`, {
                    params: { token },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(userResponse.data);


                const topicStatsResponse = await axios.get(
                    `http://localhost:8080/api/user/dashboard/stats/topics-rank`,
                    {
                        params: { token },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (topicStatsResponse.data && topicStatsResponse.data.length > 0) {
                    const translatedTopics = topicStatsResponse.data.map(topic => ({
                        ...topic,
                        topicName: translateTopicName(topic.topicName)
                    }));
                    setTopicStats(translatedTopics);

                    const totalAnswers = topicStatsResponse.data.reduce((sum, topic) => sum + (topic.totalAsked || 0), 0);
                    const correctAnswers = topicStatsResponse.data.reduce((sum, topic) => sum + (topic.totalCorrect || 0), 0);

                    setProgressData({
                        totalAnswers,
                        correctAnswers,
                        accuracy: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0


                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorMessage(error.response?.data?.message || error.message || "Failed to load user data");
                if (error.response?.status === 401) {
                    localStorage.removeItem("userToken");
                    navigate("/auth");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const token = localStorage.getItem('userToken');
            await axios.post(
                "http://localhost:8080/api/user/update-profile",
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Update failed");
            if (error.response?.status === 401) {
                localStorage.removeItem("userToken");
                navigate("/auth");
            }
        }
    };

    const formatDuration = (isoString) => {
        if (!isoString) return "N/A";


        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = isoString.match(regex);

        let seconds = 0;
        if (matches) {
            const hours = parseInt(matches[1]) || 0;
            const minutes = parseInt(matches[2]) || 0;
            seconds = parseInt(matches[3]) || 0;
            seconds += hours * 3600 + minutes * 60;
        }


        if (seconds < 60) {
            const paddedSeconds = seconds.toString().padStart(2, '0');
            return `00:${paddedSeconds}`;
        } else {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}m ${secs}s`;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar handleSignOut={() => {
                localStorage.removeItem("userToken");
                navigate("/auth");
            }} />

            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{
                            p: 3,
                            borderRadius: 2,
                            '& .MuiTextField-root': {
                                marginTop: '8px',
                                marginBottom: '8px'
                            }
                        }}>
                            <Typography variant="h5" gutterBottom>פרטי פרופיל</Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "דואר אלקטרוני", name: "email", type: "email" },
                                        { label: "שם פרטי", name: "firstName" },
                                        { label: "שם משפחה", name: "lastName" }
                                    ].map((field) => (
                                        <Grid item xs={12} sm={6} key={field.name}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label={field.label}
                                                name={field.name}
                                                type={field.type || "text"}
                                                value={userData[field.name]}
                                                onChange={handleChange}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#e0e0e0',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#bdbdbd',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3f51b5',
                                                            borderWidth: '1px'
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        backgroundColor: 'background.paper',
                                                        px: 0.5,
                                                        transform: 'translate(14px, -9px) scale(0.75)',
                                                        '&.Mui-focused': {
                                                            color: '#3f51b5'
                                                        }
                                                    }
                                                }}

                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color={submitSuccess ? "success" : "primary"}
                                    sx={{ mt: 2 }}
                                >
                                    {submitSuccess ? "השינויים בוצעו בהצלחה" : "שמור שינויים"}
                                </Button>
                            </Box>

                            {errorMessage && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h5" gutterBottom>סטטיסטיקת התקדמות</Typography>
                            <Divider sx={{ my: 2 }} />

                            {progressData ? (
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">סך הכל שאלות</Typography>
                                                    <Typography variant="h4" color="primary">
                                                        {progressData.totalAnswers}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">אחוזי דיוק </Typography>
                                                    <Typography variant="h4" color="primary">
                                                        {progressData.accuracy}%
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>סטטיסטיקה לפי נושא</Typography>
                                    {topicStats.length > 0 ? (
                                        topicStats.map((topic, index) => (
                                            <Card key={index} sx={{ mb: 2 }}>
                                                <CardContent>
                                                    <Typography variant="h6">{topic.topicName}</Typography>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={4}>
                                                            <Typography>תשובות נכונות:</Typography>
                                                            <Typography color="green">{topic.totalCorrect || 0}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography>סך הכל תשובות:</Typography>
                                                            <Typography>{topic.totalAsked || 0}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography>אחוזי דיוק:</Typography>
                                                            <Typography>
                                                                {topic.totalAsked > 0
                                                                    ? Math.round((topic.totalCorrect / topic.totalAsked) * 100)
                                                                    : 0}%
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography>זמן הכי טוב:</Typography>
                                                            <Typography>{formatDuration(topic.bestTime)}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography>זמן ממוצע:</Typography>
                                                            <Typography>{formatDuration(topic.averageTime)}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <Typography color="text.secondary">
                                            לא זמין.
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <Typography color="text.secondary">
                                    אין עדיין נתוני התקדמות זמינים.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Profile;