import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [
            true, "please enter your name!"
        ],
    },
    email: {
        type: String,
        required: [
            true, "please enter your email address!"
        ],
        unique: [true, 'this email is already exist'],
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email']
    },
    picture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYEJXPjyNl8XHhIattM2ScXdr2CiIc0bQqDi4AEDYNg&s"
    },
    status: {
       type: String,
       default: "Urgent calls only"
    },
    password: {
        type: String,
        required: [
            true, "please enter your password!"
        ],
        minLength: [6, 'password should be at least 6 characters.']
    },
},
    {
        collection: "users",
        timestamps: true, // it has two attributes: createdAt and updatedAt
    }
);

registerSchema.pre('save', async function(next) {
    try {
        if (this.isModified) {

            console.log(`current pass: ${this.password}`);
            this.password = await bcrypt.hash(this.password, 10);
            console.log(`new pass: ${this.password}`);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
})

const RegisterModel = mongoose.model("RegisterModel", registerSchema);

export default RegisterModel;