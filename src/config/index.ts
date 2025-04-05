import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  ip_address: process.env.IP_ADDRESS,
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRATION:process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION:process.env.JWT_REFRESH_EXPIRATION
};