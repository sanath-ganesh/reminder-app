import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

// NoteForm component used for creating a new note or editing an existing one.
const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [actionItems, setActionItems] = useState('');
  const navigate = useNavigate();
  const { noteId } = useParams();

  // useEffect hook to fetch and populate the form when editing a note.
  useEffect(() => {
    if (noteId) {
      fetch(`http://localhost:3000/meetingNotes/${noteId}`)
        .then((response) => response.json())
        .then((note) => {
          setTitle(note.title);
          setContent(note.content);
          setActionItems(note.actionItems.join(', '));
        })
        .catch((error) => console.error('Failed to fetch note:', error));
    }
  }, [noteId]);

  // Handles form submission for both creating a new note and updating an existing one.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const itemsArray = actionItems.split(',').map((item) => item.trim());
    const noteData = { title, content, actionItems: itemsArray };

    const url = noteId
      ? `http://localhost:3000/meetingNotes/${noteId}`
      : 'http://localhost:3000/meetingNotes';
    const method = noteId ? 'PUT' : 'POST';

    // Tries to submit the note data to the backend and navigates to the note list view if successful.
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      console.log('Success:', await response.json());
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Render the form with input fields for the note title, content, and action items.
  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='title'
        label='Note Title'
        name='title'
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='content'
        label='Note Content'
        id='content'
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <TextField
        margin='normal'
        fullWidth
        name='actionItems'
        label='Action Items (comma separated)'
        id='actionItems'
        value={actionItems}
        onChange={(e) => setActionItems(e.target.value)}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {noteId ? 'Update Note' : 'Save Note'}
      </Button>
    </Box>
  );
};

export default NoteForm;
