import MeetingNote from './../models/meeting-note.js';

// Handles incoming requests and delegates business logic

/**
 *
 * @param {*} params
 * @returns
 */
export const getAll = async (params = {}) => {
  const meetingNotes = await MeetingNote.find(params).exec();
  return meetingNotes;
};

export const getById = async (id) => {
  const meetingNote = await MeetingNote.findById(id).exec();
  return meetingNote;
};

/**
 *
 * @param {*} note
 * @param {*} res
 * @returns
 */
export const save = async (note, res) => {
  if (!note.title || !note.content) {
    throw new Error('Title and content are required.');
  }
  const meetingNote = new MeetingNote(note);
  return meetingNote.save();
};

/**
 *
 * @param {*} id
 * @param {*} note
 * @param {*} res
 * @returns
 */
export const update = async (id, note, res) => {
  const updatedMeetingNote = await MeetingNote.findByIdAndUpdate(id, note, {
    new: true,
  });
  if (!updatedMeetingNote) {
    throw new Error('MeetingNote not found.');
  }
  return updatedMeetingNote;
};

/**
 *
 * @param {*} id
 * @param {*} res
 * @returns
 */
export const deleteById = async (id, res) => {
  const meetingNote = await MeetingNote.findByIdAndDelete(id);
  if (!meetingNote) {
    throw new Error('MeetingNote not found.');
  }
  return { message: 'MeetingNote was deleted successfully.' };
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const search = async ({ keywords, startDate, endDate }) => {
  let query = {};

  if (keywords) {
    query.$or = [
      { title: { $regex: keywords, $options: 'i' } },
      { content: { $regex: keywords, $options: 'i' } },
      { actionItems: { $regex: keywords, $options: 'i' } },
    ];
  }

  if (startDate && endDate) {
    query.createdDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  } else if (startDate) {
    query.createdDate = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.createdDate = { $lte: new Date(endDate) };
  }

  const meetingNotes = await MeetingNote.find(query).exec();
  return meetingNotes;
};
