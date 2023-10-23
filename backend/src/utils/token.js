import jwt from 'jsonwebtoken';

export function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY || 'a1b1c1', { expiresIn: '1h' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY || 'a1b1c1');
}
