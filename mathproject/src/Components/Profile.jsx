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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const userResponse = await axios.get(`http://localhost:8080/api/user/info?token=${token}`);
                setUserData(userResponse.data);

                // Fetch progress data
                const progressResponse = await axios.get(`http://localhost:8080/api/progress/get/${userResponse.data.id}`);
                setProgressData({
                    ...progressResponse.data,
                    // Transform the data to match expected format
                    totalAnswers: progressResponse.data.totalAnswers || 0,
                    correctAnswers: progressResponse.data.score || 0,
                    currentLevel: progressResponse.data.currentDifficulty || 'Not specified',
                    currentTopic: progressResponse.data.currentTopic || 'Not specified'
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setErrorMessage("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axios.post(
                "http://localhost:8080/api/user/update-profile",
                userData
            );
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Update failed");
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
                    {/* Profile Section */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h5" gutterBottom>פרטי פרופיל</Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="דואר אלקטרוני"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="סיסמה"
                                    name="password"
                                    type="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="שם פרטי"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="שם משפחה"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                >
                                    שמור שינויים
                                </Button>
                            </Box>

                            {errorMessage && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>

                    {/* Progress Section */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h5" gutterBottom>סטטיסטיקת התקדמות</Typography>
                            <Divider sx={{ my: 2 }} />

                            {progressData ? (
                                <Grid container spacing={2}>
                                    {/* Total Questions Card */}
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6">Total Questions</Typography>
                                                <Typography variant="h4" color="primary">
                                                    {progressData.totalAnswers}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Accuracy Card */}
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6">Accuracy</Typography>
                                                <Typography variant="h4" color="primary">
                                                    {progressData.totalAnswers > 0
                                                        ? Math.round((progressData.correctAnswers / progressData.totalAnswers) * 100)
                                                        : 0}%
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Detailed Stats */}
                                    <Grid item xs={12}>
                                        <Card sx={{ mt: 2 }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>Detailed Statistics</Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography>Correct Answers:</Typography>
                                                        <Typography variant="h5" color="green">
                                                            {progressData.correctAnswers}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography>Wrong Answers:</Typography>
                                                        <Typography variant="h5" color="red">
                                                            {progressData.totalAnswers - progressData.correctAnswers}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card sx={{ mt: 2 }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>Current Status</Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography>Current Level:</Typography>
                                                        <Typography variant="h5">
                                                            {progressData.currentLevel}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography>Current Topic:</Typography>
                                                        <Typography variant="h5">
                                                            {progressData.currentTopic}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
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