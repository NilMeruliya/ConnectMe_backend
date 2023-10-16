import jwt from 'jsonwebtoken';
export const sign = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: expiresIn
        }, (error, token) => {
            if (error) {
                reject(error)
                console.log(error);
            } else {
                resolve(token);
            }

        })
    })
}