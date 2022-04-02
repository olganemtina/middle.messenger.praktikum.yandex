import Users from "../../data/users.json";
import User from "../models/user";

export const getCurrentUser = () =>
  (Users as Array<User>).find((x) => x.id == 1);
