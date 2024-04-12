import meetingNoteRouter from './meeting-note-route.js';
const initializeRoutes = (app) => {
  app.use('/meetingNotes', meetingNoteRouter);
};

export default initializeRoutes;
