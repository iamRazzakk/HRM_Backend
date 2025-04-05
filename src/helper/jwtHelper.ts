import jwt from 'jsonwebtoken';
import config from '../config';

interface TokenPayload {
  userId: string;
  role: string;
  email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    // @ts-ignore
  return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.JWT_ACCESS_EXPIRATION,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    // @ts-ignore
  return jwt.sign(payload, config.JWT_REFRESH_SECRET as string, {
    expiresIn: config.JWT_REFRESH_EXPIRATION,
  });
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET as string) as TokenPayload;
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET as string) as TokenPayload;
};