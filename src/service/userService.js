import createHttpError from "http-errors";
import RegisterModel from "../model/model.js";
export const findUser = async (userId) => {
  const user = await RegisterModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fill all fields.");
  return user;
};


// export const getUsers = async (keyword, userId) => {
//   const users = await UserModel.find({
//     $or: [
//       { name: { $regex: keyword, $options: "i" } },
//       { email: { $regex: keyword, $options: "i" } },
//     ],
//   }).find({
//     _id: { $ne: userId },
//   });
//   return users;
// };
