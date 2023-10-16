import { sign } from "../utils/tokenUtil.js";


export const generateToken = async (payload, expiresIn, secret) => {
    const token = await sign(payload, expiresIn, secret);
    return token;
}