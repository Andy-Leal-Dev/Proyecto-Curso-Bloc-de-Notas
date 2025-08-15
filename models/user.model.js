import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const findUserByEmail = (email) => {
  return pool.query('SELECT * FROM users WHERE email = ?', [email])
    .then(([rows]) => rows[0]);
};

export const findUserById = (id) => {
  return pool.query('SELECT id, name, email FROM users WHERE id = ?', [id])
    .then(([rows]) => rows[0]);
};

export const createUser = ({ name, email, password }) => {
  return bcrypt.hash(password, 10)
    .then(hashedPassword => {
      return pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
    })
    .then(([result]) => {
      return { id: result.insertId, name, email };
    });
};

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};