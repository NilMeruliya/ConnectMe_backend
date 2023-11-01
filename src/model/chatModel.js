import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const chatSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "chat name is required."],
      trim: true,
    },

    // picture: {
    //   type: String,
    //   required: true,
    // },

    isGroup: {
      type: Boolean,  
      required: true,
      default: false,
    },

    users: [
      {
        type: ObjectId,
        ref: "RegisterModel",
      },
    ],

    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },

    admin: {
      type: ObjectId,
      ref: "RegisterModel",
    },
  },

  {
    collection: "chats",
    timestamps: true,
  }
);

const ChatModel =
  mongoose.models.ChatModel ||
  mongoose.model("ChatModel", chatSchema);

export default ChatModel;
