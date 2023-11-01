import { sign, verify } from "../utils/tokenUtil.js";


export const generateToken = async (payload, expiresIn, secret) => {
    const token = await sign(payload, expiresIn, secret);
    return token;
}

export const verifyToken = async (token, secret) => {
    let verifiedToken = await verify(token, secret);
    return verifiedToken;
  };