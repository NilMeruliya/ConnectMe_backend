import MessageModel from "../model/messageModel.js";
import ChatModel from "../model/chatModel.js";

export const createNewMessage = async (data) => {

    let new_message = await MessageModel.create(data);
    if (!new_message)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    return new_message;
  };

export const populate_message = async (id) => {

    let message = await MessageModel.findById(id)
      .populate({
        path: "sender",
        select: "name picture",
        model: "RegisterModel",
      })
      .populate({
        path: "chat",
        select: "name picture isGroup users",
        model: "ChatModel",
        populate: {
          path: "users",
          select: "name email picture status",
          model: "RegisterModel",
        },
      });

    if (!message) throw createHttpError.BadRequest("Oops...Something went wrong !");
    return message;
  };


  export const update_latestMessage = async (chatId, message) => {

    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    if (!updatedChat)
      throw createHttpError.BadRequest("Oops...Something went wrong !");
  
    return updatedChat;
  };
  
  export const getChatMessages = async (chatId) => {
    const conversation = await MessageModel.find({ chat: chatId })
      .populate("sender", "name picture email status")
      .populate("chat");
    if (!conversation) {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    }
    return conversation;
  };
