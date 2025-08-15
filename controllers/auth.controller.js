import { 
  findUserByEmail, 
  findUserById,
  createUser,
  comparePasswords
} from '../models/user.model.js';
import { generateToken } from '../config/jwt.js';


export const renderLogin = (req, res) => {
  res.render('login', { title: 'Iniciar Sesión', error: null });
};

export const renderRegister = (req, res) => {
  res.render('register', { title: 'Registrarse', error: null });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  
  findUserByEmail(email)
    .then(user => {
      if (!user) {
        throw new Error('Credenciales inválidas');
      }
      
      return comparePasswords(password, user.password)
        .then(isValid => {
          if (!isValid) {
            throw new Error('Credenciales inválidas');
          }
          
          const token = generateToken({ id: user.id });
          
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
          });
          
          res.redirect('/notes');
        });
    })
    .catch(error => {
      console.log('Error en login:', error);
      res.status(401).render('login', { 
        error: 'Credenciales inválidas',
        title: 'Iniciar Sesión'
      });
    });
};

export const register = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).render('register', { 
      error: 'Las contraseñas no coinciden',
      title: 'Registrarse'
    });
  }
  
  findUserByEmail(email)
    .then(user => {
      if (user) {
        throw new Error('El email ya está registrado');
      }
      
      return createUser({ name, email, password });
    })
    .then(user => {
      const token = generateToken({ id: user.id });
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      });
      
      res.redirect('/notes');
    })
    .catch(error => {
      console.log('Error en register:', error);
      res.status(400).render('register', { 
        error: error.message,
        title: 'Registrarse'
      });
    });
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

