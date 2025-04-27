import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { difficultyTranslations, topicTranslations } from "./Constants.js";
import { useState } from 'react';
import axios from 'axios';

export const UserTable = ({ users, loading, token, onAdminChange }) => {
    const [updatingId, setUpdatingId] = useState(null);

    const handleAdminToggle = async (userId, currentIsAdmin) => {
        setUpdatingId(userId);
        try {
            await axios.post('http://localhost:8080/api/admin/authority-granting', null, {
                params: {
                    token: token,
                    userId: userId,
                    isAdmin: !currentIsAdmin
                }
            });
            onAdminChange(userId, !currentIsAdmin);
        } catch (error) {
            console.error('Error updating admin status:', error);

        } finally {
            setUpdatingId(null);
        }
    };

    const columns = [
        {
            field: 'userId',
            headerName: 'ID',
            width: 70,
            headerClassName: 'kids-header',
        },
        {
            field: 'userName',
            headerName: 'שם משתמש',
            width: 150,
            headerClassName: 'kids-header',
        },
        {
            field: 'fullName',
            headerName: 'שם מלא',
            width: 150,
            headerClassName: 'kids-header',
        },
        {
            field: 'isAdmin',
            headerName: 'הרשאות',
            width: 120,
            headerClassName: 'kids-header',
            renderCell: (params) => (
                <Tooltip title={params.value ? "Revoke admin" : "Make admin"}>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAdminToggle(params.row.userId, params.value);
                        }}
                        disabled={updatingId === params.row.userId}
                        color={params.value ? "primary" : "default"}
                    >
                        <AdminPanelSettingsIcon
                            color={params.value ? "primary" : "action"}
                            fontSize="small"
                        />
                    </IconButton>
                </Tooltip>
            ),
        },
        {
            field: 'currentDifficulty',
            headerName: 'רמה נוכחית',
            width: 150,
            headerClassName: 'kids-header',
            valueGetter: (value, row) =>
                row?.currentDifficulty ? difficultyTranslations[row.currentDifficulty] : 'לא זמין'
        },
        {
            field: 'currentTopic',
            headerName: 'נושא',
            width: 150,
            headerClassName: 'kids-header',
            valueGetter: (value, row) =>
                row?.currentTopic ? topicTranslations[row.currentTopic] : 'לא זמין'
        },
        {
            field: 'correctAnswers',
            headerName: 'תשובות נכונות',
            width: 130,
            type: 'number',
            headerAlign: 'left',
            align: 'left',
            headerClassName: 'kids-header',
            cellClassName: 'kids-cell',
        },
        {
            field: 'totalAnswers',
            headerName: 'סה"כ תשובות',
            width: 130,
            type: 'number',
            headerAlign: 'left',
            align: 'left',
            headerClassName: 'kids-header',
            cellClassName: 'kids-cell',
        },
    ];

    return (
        <Box sx={{
            height: 600,
            width: '100%',
            '& .kids-header': {
                backgroundColor: '#FF9E5E',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderBottom: '3px solid #FF6B9D',
            },
            '& .kids-cell': {
                fontSize: '0.875rem',
                fontWeight: '500',
            },
            '& .MuiDataGrid-cell': {
                borderRight: '2px dashed #A5DEFF',
            },
            '& .MuiDataGrid-row': {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#E8F9FF',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: '#FFFFFF',
                },
                '&:hover': {
                    backgroundColor: '#FFD6E8 !important',
                },
            },
            '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#C4F2D2',
                borderTop: '3px solid #FF9E5E',
            },
            '& .MuiDataGrid-columnSeparator': {
                color: '#FFB8D9',
            },
            '& .MuiDataGrid-menuIcon button': {
                color: '#5E7CFF',
            },
            '& .MuiDataGrid-virtualScroller': {
                backgroundColor: '#FFFFFF',
            },
            '& .MuiDataGrid-root': {
                border: '3px solid #5E7CFF !important',
                borderRadius: '12px !important',
            },
        }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                getRowId={(row) => row.userId}
                loading={loading || Boolean(updatingId)}
                localeText={{
                    noRowsLabel: 'לא נמצאו תוצאות',
                    footerRowSelected: count => `${count.toLocaleString()} שורות נבחרו`
                }}
            />
        </Box>
    );
};