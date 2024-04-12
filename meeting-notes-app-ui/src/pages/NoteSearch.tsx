import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface NoteSearchProps {
  onSearch: (keywords: string, startDate: string, endDate: string) => void;
}

const NoteSearch: React.FC<NoteSearchProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = () => {
    onSearch(keywords, startDate, endDate);
  };

  return (
    <Box display="flex" gap={2} my={2}>
      <TextField
        label="Keywords"
        variant="outlined"
        size="small"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <TextField
        label="Start Date"
        type="date"
        size="small"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        size="small"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default NoteSearch;
