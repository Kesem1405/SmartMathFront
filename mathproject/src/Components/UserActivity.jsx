import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';

export const UserActivity = () => {
    const [threads, setThreads] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchThreads = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('userToken');
            const response = await axios.get("http://localhost:8080/api/admin/threads", {
                params: { token }
            });
            setThreads(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "שגיאה בטעינת נתוני הפעילות");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    const groupThreadsByUsername = () => {
        const grouped = {};
        threads.forEach(thread => {
            const username = thread.username;
            if (!grouped[username]) {
                grouped[username] = [];
            }
            grouped[username].push(thread);
        });
        return grouped;
    };

    const groupedThreads = groupThreadsByUsername();

    if (loading) return <div>טוען פעילות משתמשים...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>שם משתמש</TableCell>
                        <TableCell>שאלה</TableCell>
                        <TableCell>נושא</TableCell>
                        <TableCell>רמת קושי</TableCell>
                        <TableCell>תשובה נכונה?</TableCell>
                        <TableCell>זמן שליחה</TableCell>
                        <TableCell>זמן מענה</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(groupedThreads).map(([username, userThreads]) => (
                        userThreads.map((thread, index) => (
                            <TableRow key={`${username}-${index}`}>
                                {index === 0 && (
                                    <TableCell rowSpan={userThreads.length}>{username}</TableCell>
                                )}
                                <TableCell>{thread.questionContext}</TableCell>
                                <TableCell>{thread.topic}</TableCell>
                                <TableCell>{thread.difficulty}</TableCell>
                                <TableCell>{thread.isCorrect ? "כן" : "לא"}</TableCell>
                                <TableCell>{thread.sendTime}</TableCell>
                                <TableCell>{thread.answerTime || "לא נענה"}</TableCell>
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};