import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import expressMongoSanitize from "express-mongo-sanitize"
import fileUpload from "express-fileupload";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// morgan middleware
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));    
}

// helmet middleware, it just adds some security
app.use(helmet());

// in order to use the data in the form of json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// it enables cookie parser
app.use(cookieParser());

// it hadles the data size and make it less to get the faster response
app.use(compression());

// express mongo sanitize, adds more security to database
app.use(expressMongoSanitize());

// to upload the files
app.use(fileUpload({
    useTempFiles: true // it creates folder, "temp"
}));

// cors, protect and restrict access to the server
app.use(cors())

// use routes as a middleware from the routes
// v1 = version 1
// //http://localhost:8888/api/v1/auth/register  
app.use("/api/v1", routes);




console.log(process.env.NODE_ENV);
export default app;