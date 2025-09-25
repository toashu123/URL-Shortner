import { userModel } from "../models/user-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user service which has CRUD
export const registerUser = async (userObject) => {
  try {
    const saltRounds = 10;
    userObject.password = await bcrypt.hash(userObject.password, saltRounds);
    const doc = await userModel.create(userObject);
    return doc;
  } catch (err) {
    console.log("Error is ", err);
    throw err;
  }
};

export const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
