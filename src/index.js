import app from "./app.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import SocketServer from "./SocketServer.js";

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

const server = app.listen(PORT, () => {
    console.log(`app is listening to the port ${PORT}`);
})  

// socket.io connection 
const io = new Server(server, {
    pingTimeout: 60000, // 1 minute
    cors: {
      origin: process.env.ENDOINT_OF_CLIENT,
    }, 
  });
  io.on("connection", (socket) => {
    console.log("socket io connected successfully.");
    SocketServer(socket, io);
  });
  