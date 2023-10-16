import createHttpError from "http-errors";
import { createUser, loginUser } from "../service/authService.js";
import { generateToken } from "../service/tokenService.js";

export const register = async (req, res, next) => {
    try {
        const {name, email, picture, status, password} = req.body;
        const newUser = await createUser({
            name, email, picture, status, password
        })

        // or 

        // const newUser = await createUser({
        // name: req.body.name, 
        // email: req.body.email, 
        // picture: req.body.picture, 
        // status: req.body.status, 
        // password: req.body.password
        // })


        // create a new token
        const accessToken = await generateToken(
            { userId: newUser._id },
            "1d",
            process.env.TOKEN_SECRET_KEY);

        // create a new token
        const refreshToken = await generateToken(
            { userId: newUser._id },
            "30d",
            process.env.REFRESH_SECRET_KEY);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/auth/refreshToken',
            maxAge: 30*24*60*60*1000 // for 30 days
        })

        console.log({accessToken, refreshToken});

        res.json({
            messsage: "registered successfully", 
            accessToken, 
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                password: newUser.password,
            } 
        });
        console.log(req.body); 
    } catch (error) {
        res.status(500);
        next(error)
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

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/v1/auth/refreshToken',
            maxAge: 30*24*60*60*1000 // for 30 days
        })

        console.log({accessToken, refreshToken});

        res.json({
            messsage: "registered successfully", 
            accessToken, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                password: user.password,
            } 
        });
    } catch (error) {
        res.status(500);
        next(error)
    }
} 

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken', {path: '/api/v1/auth/refreshToken'})
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
        const token_refresh = req.cookies.refreshToken;
        if (!token_refresh) {
            throw createHttpError.Unauthorized('please log in.')
        }
    } catch (error) {
        res.status(500);
        next(error)
    }
} 