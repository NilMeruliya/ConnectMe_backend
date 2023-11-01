import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "RegisterModel",
    },
    message: {
      type: String,
      trim: true,
    },
    chat: {
      type: ObjectId,
      ref: "ChatModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);

export default MessageModel;
