import createHttpError from "http-errors";
import validator from "validator";
import RegisterModel from "../model/model.js";

export const createUser = async (userData) => {
    const {name, email, picture, status, password} = userData;

    // check if required fields are empty or not
    if (!name || !email || !password) {
        throw createHttpError.BadRequest('please fill out all the information')
    }
 
      // check length of the name
      if (!validator.isLength(name, {
        min: 2,
        max: 20
    })) {
        throw createHttpError.BadRequest('name length should be between 2 and 20 characters.')
    }

    // for the email
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('email is invalid.')
    }

     // for password
     if (!validator.isLength(password, {
        min: 6
     })) {
        throw createHttpError.BadRequest('password should be at least 6 characters.')
    }
  
    //if user is already exist
    const checkUser = await RegisterModel.findOne({email});

    if (checkUser) {
        throw createHttpError.Conflict('email is already exist.')
    }

    // password hashing would be in the user model

    // add or save new user info to database
    const user = await new RegisterModel({
        name,
        email,
        picture: picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYEJXPjyNl8XHhIattM2ScXdr2CiIc0bQqDi4AEDYNg&s",
        status: status || "Connect me through ConnectMe!",
        password
    }).save();

    return user;
}

