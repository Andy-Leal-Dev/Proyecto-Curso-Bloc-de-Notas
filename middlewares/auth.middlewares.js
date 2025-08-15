import { verifyToken } from '../config/jwt.js';
import { findUserById } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).redirect('/');
  }
  
  try {
    // Await the promise from verifyToken
    const decoded = await verifyToken(token);

    
    const user = await findUserById(decoded.id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log('Error en authMiddleware:', error);
    res.clearCookie('token');
    res.status(401).redirect('/');
  }
};