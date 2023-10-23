import bcrypt from 'bcryptjs';

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
