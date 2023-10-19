import createHttpError from "http-errors";
import validator from "validator";
import RegisterModel from "../model/model.js";
import bcrypt from 'bcryptjs'

export const createUser = async (userData) => {
    const {name, email, picture, status, password} = userData;

    console.log("check user data here");
    console.log(userData);

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
        throw createHttpError.Conflict('Email id already exists!')
        // throw new Error('email is already exist.')
        // res.status(400).send({
        //     message: 'Email id already exist'
        //  });
    }

    // password hashing would be in the user model

    // add or save new user info to database
    const user = await new RegisterModel({
        name,   // or name: name
        email,
        picture: picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYEJXPjyNl8XHhIattM2ScXdr2CiIc0bQqDi4AEDYNg&s",
        status: status || "Connect me through ConnectMe!",
        password
    }).save();

    return user;
}


export const loginUser = async (email, password) => {
    const user = await RegisterModel.findOne({email: email.toLowerCase()}).lean();


    // check if user exist or not
    if (!user ) {
        throw createHttpError.NotFound("Invalid credentials")
    }

    // compare user password and password from database 
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw createHttpError.NotFound("Please enter a valid password!")
    }

    return user;
}

