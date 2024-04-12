import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoteSearch from './NoteSearch'; // Ensure this import is correctly pointing to your NoteSearch component

interface ActionItem {
  text: string;
  isCompleted: boolean;
}

interface Note {
  _id: string;
  title: string;
  content: string;
  actionItems: ActionItem[];
  createdDate: string;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes(); // Call fetchNotes to handle initial data fetching
  }, []);

  // Function to fetch all notes or filtered notes based on the provided parameters
  const fetchNotes = (keywords = '', startDate = '', endDate = '') => {
    const queryParams = new URLSearchParams({
      ...(keywords && { keywords }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    }).toString();

    const url = queryParams ? `http://localhost:3000/meetingNotes/search?${queryParams}` : 'http://localhost:3000/meetingNotes';

    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        setNotes(
          data.map((note: Note) => ({
            ...note,
            actionItems: note.actionItems.map((item) => ({
              text: item,
              isCompleted: false,
            })),
          }))
        )
      )
      .catch((error) => console.error('Failed to fetch notes:', error));
  };

  const toggleNoteExpansion = (_id: string) => {
    if (expandedNoteId === _id) {
      setExpandedNoteId(null);
    } else {
      setExpandedNoteId(_id);
    }
  };

  const handleActionItemChange = (noteId: string, index: number) => {
    setNotes(
      notes.map((note) => {
        if (note._id === noteId) {
          const updatedActionItems = [...note.actionItems];
          updatedActionItems[index].isCompleted = !updatedActionItems[index].isCompleted;
          return { ...note, actionItems: updatedActionItems };
        }
        return note;
      })
    );
  };

  const handleDelete = (noteId: string) => {
    fetch(`http://localhost:3000/meetingNotes/${noteId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the note.');
      }
      // If delete was successful, remove the note from the state
      setNotes(notes.filter(note => note._id !== noteId));
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Box>
      <NoteSearch onSearch={fetchNotes} /> {/* Use fetchNotes to handle search submissions */}
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/create')}
        sx={{ mb: 2 }}
      >
        Create New Note
      </Button>
      {notes.length ? (
        notes.map((note) => (
          <Box
            key={note._id}
            onClick={() => toggleNoteExpansion(note._id)}
            sx={{
              cursor: 'pointer',
              margin: '10px 0',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <Typography variant='h5'>{note.title}</Typography>
            <Typography variant='body1' paragraph>
              {expandedNoteId !== note._id
                ? (() => {
                    const words = note.content.split(' ');
                    return words.length > 10
                      ? words.slice(0, 10).join(' ') + '...'
                      : note.content;
                  })()
                : note.content}
            </Typography>
            {expandedNoteId === note._id && (
              <>
                <Typography variant='subtitle2' color='textSecondary' paragraph>
                  Created on: {new Date(note.createdDate).toLocaleDateString()}
                </Typography>
                <List>
                  {note.actionItems.map((item, index) => (
                    <ListItem key={index} onClick={(e) => e.stopPropagation()}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={item.isCompleted}
                            onChange={() =>
                              handleActionItemChange(note._id, index)
                            }
                          />
                        }
                        label={item.text}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${note._id}`);
                  }}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  color='error'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note._id);
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        ))
      ) : (
        <Typography variant='body1'>No notes found.</Typography>
      )}
    </Box>
  );
};

export default NoteList;
