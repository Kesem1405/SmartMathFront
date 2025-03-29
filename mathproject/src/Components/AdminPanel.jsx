import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    TextField,
    InputAdornment,
    Box,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { isAdmin, topicTranslations, difficultyTranslations } from './Constants.js';
import Navbar from "./Navbar.jsx";

export function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');

    useEffect(() => {
        if (!isAdmin()) return;

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/progress/get/all');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
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

    const columns = [
        { field: 'userId', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'שם משתמש', width: 150 },
        { field: 'fullName', headerName: 'שם מלא', width: 150 },
        {
            field: 'currentDifficulty',
            headerName: 'רמה נוכחית',
            width: 150,
            valueGetter: (value, row) =>
                row?.currentDifficulty ? difficultyTranslations[row.currentDifficulty] : 'לא זמין'
        },
        {
            field: 'currentTopic',
            headerName: 'נושא',
            width: 150,
            valueGetter: (value, row) =>
                row?.currentTopic ? topicTranslations[row.currentTopic] : 'לא זמין'
        },
        {
            field: 'correctAnswers',
            headerName: 'תשובות נכונות',
            width: 130,
            type: 'number',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'totalAnswers',
            headerName: 'סה"כ תשובות',
            width: 130,
            type: 'number',
            headerAlign: 'left',
            align: 'left'
        },
    ];

    if (!isAdmin()) {
        return <div>הגישה נדחתה</div>;
    }

    if (loading) {
        return <div>טוען...</div>;
    }

    if (error) {
        return <div>שגיאה: {error}</div>;
    }

    return (
        <div className="admin-panel" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div className="navbar-admin-panel">
            <Navbar />
            </div>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="חפש משתמש..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ minWidth: 250 }}
                        />

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>רמת קושי</InputLabel>
                            <Select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FilterList fontSize="small" />
                                    </InputAdornment>
                                }
                                label="רמת קושי"
                            >
                                {difficultyOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>נושא</InputLabel>
                            <Select
                                value={topicFilter}
                                onChange={(e) => setTopicFilter(e.target.value)}
                                label="נושא"
                            >
                                {topicOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={filteredUsers}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            getRowId={(row) => row.userId}
                            autoHeight
                            localeText={{
                                noRowsLabel: 'לא נמצאו תוצאות',
                                footerRowSelected: count => `${count.toLocaleString()} שורות נבחרו`
                            }}
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderRight: '1px solid #f0f0f0',
                                },
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}