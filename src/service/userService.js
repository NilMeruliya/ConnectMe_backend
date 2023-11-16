import createHttpError from "http-errors";
import RegisterModel from "../model/model.js";

export const findUser = async (userId) => {
  const user = await RegisterModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fill all fields.");
  return user;
};

export const findUsersService = async (keyword, userId) => {
  const users = await RegisterModel.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  })
  .find({
    _id: { $ne: userId },
  });
  return users;
};
