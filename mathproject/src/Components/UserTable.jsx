import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { difficultyTranslations, topicTranslations } from "./Constants.js";

// eslint-disable-next-line react/prop-types
export const UserTable = ({ users, loading }) => {
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
                loading={loading}
                localeText={{
                    noRowsLabel: 'לא נמצאו תוצאות',
                    footerRowSelected: count => `${count.toLocaleString()} שורות נבחרו`
                }}
            />
        </Box>
    );
};