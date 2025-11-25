import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const TOKEN_TTL = '7d';

type JwtPayload = {
  userId: string;
  role: string;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: TOKEN_TTL });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
