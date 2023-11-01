import createHttpError from "http-errors";
import { createUser, loginUser } from "../service/authService.js";
import { generateToken, verifyToken } from "../service/tokenService.js";
import { findUser } from "../service/userService.js";

export const register = async (req, res, next) => {
    try {
        const {name, email, picture, status, password} = req.body;
        console.log("before")
        const newUser = await createUser({
            name, email, picture, status, password
        })

        console.log("chec new user");
        console.log(newUser)

        // or 

        // const newUser = await createUser({
        // name: req.body.name, 
        // email: req.body.email, 
        // picture: req.body.picture, 
        // status: req.body.status, 
        // password: req.body.password
        // })


        // create a new token
        if(newUser) {
            const accessToken = await generateToken(
                { userId: newUser._id },
                "1d",
                process.env.TOKEN_SECRET_KEY);
    
            // create a new token
            const refreshToken = await generateToken(
                { userId: newUser._id },
                "30d",
                process.env.REFRESH_SECRET_KEY);
    
            res.cookie('tokenRefresh', refreshToken, {
                httpOnly: true,
                path: '/api/v1/auth/tokenRefresh',
                maxAge: 30*24*60*60*1000 // for 30 days
            })
    
            // console.log({accessToken, tokenRefresh});
            res.json({
                messsage: "registered successfully", 
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    picture: newUser.picture,
                    status: newUser.status,
                    // password: newUser.password,
                    // token: accessToken,
                    accessToken
                } 
            });
        }
        
    } catch (error) {
        console.log("check error here");
        console.log(error);
        res.status(500).send({
            error: error.message
        })
    }
} 

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        // res.json(user)

         // create a new token
         const accessToken = await generateToken(
            { userId: user._id },
            "1d",
            process.env.TOKEN_SECRET_KEY);

        // create a new token
        const refreshToken = await generateToken(
            { userId: user._id },
            "30d",
            process.env.REFRESH_SECRET_KEY);

        res.cookie('tokenRefresh', refreshToken, {
            httpOnly: true,
            path: '/api/v1/auth/tokenRefresh',
            maxAge: 30*24*60*60*1000 // for 30 days
        })

        // console.log({accessToken, tokenRefresh});

        res.json({
            messsage: "logged in  successfully", 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                accessToken 
            } 
        });
    } catch (error) {
        res.status(500).send(error)
        next(error)
    }
} 

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('tokenRefresh', {path: '/api/v1/auth/tokenRefresh'})
        res.json({
            message: "logged out successfully!", 
        });
    } catch (error) {
        res.status(500);
        next(error)
    }
} 

export const tokenRefresh = async (req, res, next) => {
    try {
        const token_refresh = req.cookies.tokenRefresh;
        if (!token_refresh) {
            throw createHttpError.Unauthorized('please log in.')
        }

        const verifiedToken = await verifyToken(
            token_refresh,
            process.env.REFRESH_SECRET_KEY
          );
          const user = await findUser(verifiedToken.userId);
          // create a new token
         const accessToken = await generateToken(
            { userId: user._id },
            "1d",
            process.env.TOKEN_SECRET_KEY);
          res.json({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              picture: user.picture,
              status: user.status,
            //   password: user.password,
              // token: accessToken,
              accessToken
            },
          });
    } catch (error) {
        res.status(500);
        next(error)
    }
} 