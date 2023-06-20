import { TOKEN_EXPIRATION_TIME } from '@/lib/constants';
import { SignJWT } from 'jose';

const signJWT = async (payload) => {
  const secret = new TextEncoder().encode(process.env.BACKEND_SECRET);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Date.now() + TOKEN_EXPIRATION_TIME)
    .sign(secret);

  return jwt;
};

export default signJWT;
