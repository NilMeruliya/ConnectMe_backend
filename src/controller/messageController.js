import { createNewMessage, getChatMessages, populate_message, update_latestMessage } from "../service/messageService.js";

export const sendMessages = async (req, res, next) => {
    try {

        const userId = req.user.userId;
        const { message, chatId, files } = req.body;

        if (!chatId || (!message && !files)) {
          console.log("Please provider a chat id and a message body");
          return res.sendStatus(400);
        }

        const messageData = {
          sender: userId,
          message,
          chat: chatId,
          files: files || [],
        };

        let new_message = await createNewMessage(messageData);
        let populated_message = await populate_message(new_message._id);

        await update_latestMessage(chatId, new_message)
        res.json(populated_message) 

       } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;
        if (!chatId) {
          console.log("Please add a conversation id in params.");
          res.sendStatus(400);
        }
        const messages = await getChatMessages(chatId);
        res.json(messages);
    } catch (error) {
        next(error);
    }
}