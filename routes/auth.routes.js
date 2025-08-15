import express from 'express';
import {
  renderLogin,
  renderRegister,
  login,
  register,
  logout,

} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', renderLogin);
router.post('/login', login);
router.get('/register', renderRegister);
router.post('/register', register);
router.get('/logout', logout);

export default router;