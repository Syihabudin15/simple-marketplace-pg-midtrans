import express from "express";
import AuthService from "../../Services/AuthService/AuthService.js";

const authRouter = express.Router();
const auth = new AuthService();

authRouter.post('/register', auth.SaveCredential);
authRouter.post('/login', auth.Login);

export default authRouter;