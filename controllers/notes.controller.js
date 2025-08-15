import { 
  findAllNotesByUser,
  findNoteByIdAndUser,
  createNote,
  updateNote,
  deleteNote
} from '../models/note.model.js';


export const renderHome = (req, res) => {
  findAllNotesByUser(req.user.id)
    .then(notes => {
      res.render('home', { 
        title: 'Mis Notas',
        notes,
        user: req.user
      });
    })
    .catch(error => {
      console.log('Error al obtener notas:', error);
      res.status(500).render('home', { 
        title: 'Mis Notas',
        error: 'Error al cargar las notas'
      });
    });
};

export const getById = (req, res) => {
  const { id } = req.params;
  findNoteByIdAndUser(id, req.user.id)
    .then(note => {
      if (!note) {
        return res.status(404).render('home', { 
          title: 'Mis Notas',
          error: 'Nota no encontrada'
        });
      }
      res.json(note);
    })
    .catch(error => {
      console.log('Error al obtener notas:', error);
      res.status(500).render('home', { 
        title: 'Mis Notas',
        error: 'Error al cargar las notas'
      });
    });
};

export const createNoteHandler = (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Título y contenido son requeridos' });
  }
  
  createNote({ title, content, userId: req.user.id })
    .then(note => {
      res.status(201).json({ 
        success: true,
        note
      });
    })
    .catch(error => {
      console.log('Error al crear nota:', error);
      res.status(500).json({ error: 'Error al crear la nota' });
    });
};

export const updateNoteHandler = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Título y contenido son requeridos' });
  }
  
  findNoteByIdAndUser(id, req.user.id)
    .then(note => {
      if (!note) {
        throw new Error('Nota no encontrada');
      }
      
      return updateNote(id, req.user.id, { title, content });
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.log('Error al actualizar nota:', error);
      res.status(400).json({ error: error.message });
    });
};

export const deleteNoteHandler = (req, res) => {
  const { id } = req.params;
  
  findNoteByIdAndUser(id, req.user.id)
    .then(note => {
      if (!note) {
        throw new Error('Nota no encontrada');
      }
      
      return deleteNote(id, req.user.id);
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.log('Error al eliminar nota:', error);
      res.status(400).json({ error: error.message });
    });
};