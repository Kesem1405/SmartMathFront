import { useState, useEffect } from 'react';
import { Alert, Box, Container, Paper, Typography } from '@mui/material';
import { UserTable } from './UserTable';
import { FilterControls } from './FilterControls';
import { UserActivity } from './UserActivity';
import { isAdmin, topicTranslations, difficultyTranslations } from './Constants';
import Navbar from "./Navbar.jsx";
import ChartPanel from "./ChartPanel.jsx";
import CircularProgress from '@mui/material/CircularProgress';

export const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');
    const [adminToken, setAdminToken] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            setAdminToken(token);
        }
    }, []);

    const difficultyOptions = [
        { value: 'all', label: 'כל הרמות' },
        ...Object.entries(difficultyTranslations).map(([value, label]) => ({
            value,
            label
        }))
    ];

    const topicOptions = [
        { value: 'all', label: 'כל הנושאים' },
        ...Object.entries(topicTranslations).map(([value, label]) => ({
            value,
            label
        }))
    ];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/progress/get/all', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdminChange = (userId, newIsAdmin) => {
        setUsers(users.map(user =>
            user.userId === userId ? { ...user, isAdmin: newIsAdmin } : user
        ));
        setFilteredUsers(filteredUsers.map(user =>
            user.userId === userId ? { ...user, isAdmin: newIsAdmin } : user
        ));
    };

    useEffect(() => {
        if (!isAdmin()) return;
        if (adminToken) {
            fetchUsers();
        }
    }, [adminToken]);

    useEffect(() => {
        const filtered = users.filter(user => {
            const matchesSearch =
                user.userName?.toLowerCase().includes(searchText.toLowerCase()) ||
                user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
                user.userId?.toString().includes(searchText);

            const matchesDifficulty =
                difficultyFilter === 'all' ||
                user.currentDifficulty === difficultyFilter;

            const matchesTopic =
                topicFilter === 'all' ||
                user.currentTopic === topicFilter;

            return matchesSearch && matchesDifficulty && matchesTopic;
        });
        setFilteredUsers(filtered);
    }, [users, searchText, difficultyFilter, topicFilter]);

    if (!isAdmin()) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Alert severity="error">הגישה נדחתה - אין לך הרשאות מנהל</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    פאנל ניהול
                </Typography>

                <ChartPanel />

                <Paper elevation={3} sx={{ p: 3, my: 3, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        ניהול משתמשים
                    </Typography>

                    <FilterControls
                        searchText={searchText}
                        setSearchText={setSearchText}
                        difficultyFilter={difficultyFilter}
                        setDifficultyFilter={setDifficultyFilter}
                        topicFilter={topicFilter}
                        setTopicFilter={setTopicFilter}
                        onRefresh={fetchUsers}
                        difficultyOptions={difficultyOptions}
                        topicOptions={topicOptions}
                    />

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ my: 2 }}>
                            {error}
                        </Alert>
                    ) : (
                        <UserTable
                            users={filteredUsers}
                            loading={loading}
                            token={adminToken}
                            onAdminChange={handleAdminChange}
                        />
                    )}
                </Paper>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        פעילות משתמשים
                    </Typography>
                    <UserActivity />
                </Paper>
            </Container>
        </Box>
    );
};