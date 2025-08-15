import express from 'express';
import {authMiddleware} from '../middlewares/auth.middlewares.js';
import {
  renderHome,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  getById
} from '../controllers/notes.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', renderHome);
router.get('/:id', getById);
router.post('/', createNoteHandler);
router.put('/:id', updateNoteHandler);
router.delete('/:id', deleteNoteHandler);

export default router;