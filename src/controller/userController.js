import createHttpError from "http-errors";
import { findUsersService } from "../service/userService.js";

export const findUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) {
      console.log("Please add a search query first");
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    }
    const users = await findUsersService(keyword, req.user.userId);
    res.status(200).json(users);
  
  } catch (error) {
    next(error);
  }
};
