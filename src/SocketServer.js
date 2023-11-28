let onlineUsers = [];

export default function (socket, io) {
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
    io.emit("get-online-users", onlineUsers);

    //send socket id
    io.emit("setup socket", socket.id);
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
  });

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

  //typing
  socket.on("typing", (chat) => {
    socket.in(chat).emit("typing", chat);
    console.log("typing...", chat);
  });
  socket.on("stop typing", (chat) => {
    socket.in(chat).emit("stop typing");
    console.log("stop typing...", chat);
  });

    //call
  //---call user
  socket.on("call user", (data) => {
    console.log(data);
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });

  //---answer call
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

    //---end call
    socket.on("end call", (id) => {
      io.to(id).emit("end call");
    });
}
