export const register = async (req, res, next) => {
    try {
        res.send(req.body)
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