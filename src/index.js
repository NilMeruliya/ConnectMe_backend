import app from "./app.js";
import mongoose from "mongoose";

const {DATABASE_URL} = process.env; 

// mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connection successful"))
.catch((error) => console.log(error));

//database debug mode
if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
}

const PORT = process.env.PORT || 6458;

app.listen(PORT, () => {
    console.log(`app is listening to the port ${PORT}`);
})  

