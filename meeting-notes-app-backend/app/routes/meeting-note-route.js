import express from 'express';

import * as meetingNotesController from './../controllers/meeting-note-controller.js';

// Defines the routes for the MeetingNotes Application
const router = express.Router();
router
  .route('/')
  .get(meetingNotesController.getAllMeetingNotes)
  .post(meetingNotesController.createMeetingNote);

router.route('/search').get(meetingNotesController.searchMeetingNotes);

router
  .route('/:id')
  .put(meetingNotesController.updateMeetingNote)
  .get(meetingNotesController.getMeetingNoteById)
  .delete(meetingNotesController.deleteMeetingNote);

export default router;
