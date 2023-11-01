import createHttpError from "http-errors";
import ChatModel from "../model/chatModel.js"
import RegisterModel from "../model/model.js"

export const isChatExist = async (senderId, receiverId) => {
  let chats = await ChatModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: senderId } } },
      { users: { $elemMatch: { $eq: receiverId } } },
    ],
  })
    .populate("users", "-password") // it gets name, email, picture, status, but not the password.
    .populate("latestMessage");
//   console.log(chats);
  if (!chats) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }

//   populate message model
chats = await RegisterModel.populate(chats, {
    path: 'latestMessage.sender',
    select: "name email picture status",
   })

   return chats[0]; // find() method returns an array of object, findOne() method returns only single object
}



export const createChat = async (data) => {
    const newChat = await ChatModel.create(data);
    if (!newChat)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    return newChat;
  };

  export const populateChat = async (
    id,
    fieldToPopulate,
    fieldToRemove
  ) => {
    const populatedChat = await ChatModel.findOne({ _id: id }).populate(
      fieldToPopulate,
      fieldToRemove
    );
    if (!populatedChat)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    return populatedChat;
  };


  export const getUserChats = async (user_id) => {
    let chats;
    await ChatModel.find({
      users: { $elemMatch: { $eq: user_id } },
    })
      .populate("users", "-password")
      .populate("admin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await RegisterModel.populate(results, {
          path: "latestMessage.sender",
          select: "name email picture status",
        });
        chats = results;
      })
      .catch((err) => {
        throw createHttpError.BadRequest("Oops...Something went wrong !");
      });
    return chats;
  };