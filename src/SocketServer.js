let onlineUsers = []; 

export default function(socket, io) {

//user joins or opens the application // home page
  socket.on("join", (user) => {
    console.log("user has joined: ", user);
    socket.join(user);

     //add joined user to online users
     if (!onlineUsers.some((u) => u.userId === user)) {
      console.log(`${user} is now online`);
      onlineUsers.push({ userId: user, socketId: socket.id });
   
    }
          //send online users to frontend
          io.emit("get-online-users", onlineUsers)


        });

 //socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user has just disconnected");
    io.emit("get-online-users", onlineUsers);
  });
    
 //join a chat room // chat page
 socket.on("join chat", (chat) => {
  console.log("user has joined chat:", chat);
  socket.join(chat);
}
);

  //send and receive message // chatAction page
  socket.on("send message", (message) => {
    console.log("user has sent a message:", message);
        let chat = message.chat; 
        if (!chat.users) return;
        chat.users.forEach((user) => {
          if (user._id === message.sender._id) return;
          socket.in(user._id).emit("receive message", message);
        });
      });
}


