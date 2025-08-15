import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

function generateToken(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

// In jwt.js
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, secret);
      resolve(decoded);
    } catch (error) {
      console.log('Error al verificar token:', error);
      reject(new Error('Token inválido o expirado'));
    }
  });
}

export { generateToken, verifyToken };