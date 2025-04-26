// components/admin/FilterControls.jsx
import {
    TextField,
    InputAdornment,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import { Search, FilterList, Refresh } from '@mui/icons-material';

export const FilterControls = ({
                                   searchText,
                                   setSearchText,
                                   difficultyFilter,
                                   setDifficultyFilter,
                                   topicFilter,
                                   setTopicFilter,
                                   onRefresh,
                                   difficultyOptions,
                                   topicOptions
                               }) => {
    return (
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

            <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={onRefresh}
                sx={{ ml: 'auto' }}
            >
                רענן
            </Button>
        </Box>
    );
};