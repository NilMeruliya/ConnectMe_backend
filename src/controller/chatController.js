import createHttpError from "http-errors";
import { createChat, getUserChats, isChatExist, populateChat } from "../service/chatService.js";
import ChatModel from "../model/chatModel.js";
import RegisterModel from "../model/model.js";
import { findUser } from "../service/userService.js";


export const createOpenChat = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiverId } = req.body;
    
    //check if we have receiver id or not
    if (!receiverId) {
      console.log("please enter the user id you want to have a chat with!");
      res.status(400).send("something went wrong!");
    //   throw createHttpError.BadGateway('something went wrong!')
    }

    //check if chat already exist or not
    const existedChat = await isChatExist(senderId, receiverId);

    if (existedChat) {
      res.json(existedChat);
    } else {
    //   res.send("you need to create a new chat");

//      //it's a group chat
//      let chatData = await ChatModel.findById(isGroup)
//      .populate("users admin", "-password")
//      .populate("latestMessage");

//    if (!chatData)
//      throw createHttpError.BadRequest("Oops...Something went wrong !");
//    //populate message model
//    chatData = await RegisterModel.populate(chatData, {
//      path: "latestMessage.sender",
//      select: "name email picture status",
//    });

// return chatData;


        let receiverUser = await findUser(receiverId);
        let chatData = {
            name: receiverUser.name,
            isGroup: false,
            users: [senderId, receiverId]
        }

        const newChat = await createChat(chatData);
        const populatedChat = await populateChat(newChat._id, 'users', '-password')
        res.status(200).json(populatedChat);
    }
  } catch (error) {
    // res.status(500).send(error);
    next(error)
  }
};

export const getChats = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const chats = await getUserChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};
