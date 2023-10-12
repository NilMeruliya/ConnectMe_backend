import { createUser } from "../service/authService.js";

export const register = async (req, res, next) => {
    try {
        const {name, email, picture, status, password} = req.body;
        const newUser = await createUser({
            name, email, picture, status, password
        })

        res.json(newUser);
        console.log(req.body); 
    } catch (error) {
        res.status(500);
        next(error)
    }
} 

export const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500);
        next(error)
    }
} 

export const logout = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500);
        next(error)
    }
} 

export const tokenRefresh = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500);
        next(error)
    }
} 