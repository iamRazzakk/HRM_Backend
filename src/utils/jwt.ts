import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
};
