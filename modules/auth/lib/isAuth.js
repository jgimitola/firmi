import { jwtVerify } from 'jose';

const isAuth = async (token) => {
  const SECRET = new TextEncoder().encode(process.env.BACKEND_SECRET);

  let tokenIsValid = false;
  let decoded = null;
  try {
    const { payload } = await jwtVerify(token, SECRET);

    const now = new Date();
    const expirationDate = new Date((payload.exp || 1) * 1000);

    tokenIsValid = !(now > expirationDate);
    decoded = payload;
  } catch (error) {}

  return { authenticated: Boolean(token) && tokenIsValid, decoded };
};

export default isAuth;
