import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();

export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    scope: [],
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.cookie_password, options);
}

export function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.cookie_password);
    return {
    id: decoded.id,
    email: decoded.email,
    scope: decoded.scope, }
  } catch (e) {
    console.log(e.message);
  }
 return null; 
}

export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

export function getUserIdFromRequest(request) {
  let userId = null;
  try {
    const { authorization } = request.headers;
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone")
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
}
