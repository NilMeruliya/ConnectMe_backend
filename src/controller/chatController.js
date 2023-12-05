import {
  createChat,
  getUserChats,
  isChatExist,
  populateChat,
} from "../service/chatService.js";

export const createOpenChat = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, isGroup } = req.body;

    if (isGroup == false) {
      //check if we have receiver id or not
      if (!receiverId) {
        console.log("please enter the user id you want to have a chat with!");
        res.status(400).send("something went wrong!");
      }

      //check if chat already exist or not
      const existedChat = await isChatExist(senderId, receiverId, false);

      if (existedChat) {
        res.json(existedChat);
      } else {
        let chatData = {
          name: "chat name",
          picture: "chat picture",
          isGroup: false,
          users: [senderId, receiverId],
        };

        const newChat = await createChat(chatData);
        const populatedChat = await populateChat(
          newChat._id,
          "users",
          "-password"
        );
        res.status(200).json(populatedChat);
      }
    } else {
      // console.log("hnaaaaaaaaaa");
      //it's a group chat
      //check if group chat exists
      const existedGroupChat = await isChatExist("", "", isGroup);
      res.status(200).json(existedGroupChat);
    }
  } catch (error) {
    // res.status(500).send(error);
    next(error);
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

export const createGroup = async (req, res, next) => {
  const { name, users } = req.body;
  //add current user to users
  users.push(req.user.userId);
  if (!name || !users) {
    res.status(400).send("Please fill all the fields.");
  }
  if (users.length < 2) {
    res.status(400).send("Atleast 2 users are required to start a group chat.");
  }
  let chatData = {
    name,
    users,
    isGroup: true,
    admin: req.user.userId,
    picture: process.env.DEFAULT_GROUP_PHOTO,
  };
  try {
    const newChat = await createChat(chatData);
    const populatedChat = await populateChat(
      newChat._id,
      "users admin",
      "-password"
    );
    // console.log(populatedChat);
    res.status(200).json(populatedChat);
  } catch (error) {
    next(error);
  }
};
