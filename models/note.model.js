import { pool } from '../config/db.js';

export const findAllNotesByUser = (userId) => {
  return pool.query(
    'SELECT * FROM notes WHERE user_id = ? ORDER BY fecha_creacion DESC',
    [userId]
  ).then(([rows]) => rows);
};

export const findNoteByIdAndUser = (id, userId) => {
  return pool.query(
    'SELECT * FROM notes WHERE id = ? AND user_id = ?',
    [id, userId]
  ).then(([rows]) => rows[0]);
};

export const createNote = ({ title, content, userId }) => {
  return pool.query(
    'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId]
  ).then(([result]) => {
    return { id: result.insertId, title, content };
  });
};

export const updateNote = (id, userId, { title, content }) => {
  return pool.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?',
    [title, content, id, userId]
  ).then(() => ({ id, title, content }));
};

export const deleteNote = (id, userId) => {
  return pool.query(
    'DELETE FROM notes WHERE id = ? AND user_id = ?',
    [id, userId]
  ).then(() => true);
};