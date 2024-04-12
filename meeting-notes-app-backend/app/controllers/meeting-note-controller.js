import { response } from 'express';
import * as meetingNoteService from './../services/meeting-note-service.js';
import { setResponse, setError } from './response-handler.js';

//Controller for MeetingNotes Application

//Get Meeting Notes
export const getAllMeetingNotes = async (request, response) => {
  try {
    const params = { ...request.query };
    const notes = await meetingNoteService.getAll(params);
    setResponse(notes, response);
  } catch (error) {
    setError(error, response);
  }
};

// Get a single Meeting Note by ID
export const getMeetingNoteById = async (request, response) => {
  try {
    const { id } = request.params;
    const meetingNote = await meetingNoteService.getById(id);
    if (!meetingNote) {
      return response.status(404).json({ message: 'Meeting note not found.' });
    }
    setResponse(meetingNote, response);
  } catch (error) {
    setError(error, response);
  }
};


//create Meeting Note
export const createMeetingNote = async (request, response) => {
  try {
    const note = { ...request.body };
    const meetingNote = await meetingNoteService.save(note, response);
    setResponse(meetingNote, response);
  } catch (error) {
    if (error.message === 'Title and content are required.') {
      return response.status(400).json({ message: error.message });
    }
    setError(error, response);
  }
};
// Update Meeting Note
export const updateMeetingNote = async (request, response) => {
  try {
    const note = { ...request.body };
    const meetingNote = await meetingNoteService.update(
      request.params.id,
      note,
      response
    );
    setResponse(meetingNote, response);
  } catch (error) {
    if (error.message === 'MeetingNote not found.') {
      return response.status(404).json({ message: error.message });
    }
    setError(error, response);
  }
};

// Delete Meeting Note
export const deleteMeetingNote = async (request, response) => {
  try {
    const meetingNote = await meetingNoteService.deleteById(
      request.params.id,
      response
    );
    setResponse(meetingNote, response);
  } catch (error) {
    if (error.message === 'MeetingNote not found.') {
      return response.status(404).json({ message: error.message });
    }
    setError(error, response);
  }
};

// Filter Meeting notes by keywords and date range
export const searchMeetingNotes = async (request, response) => {
  try {
    const meetingNote = await meetingNoteService.search(request.query);
    setResponse(meetingNote, response);
  } catch (error) {
    setError(error, response);
  }
};
