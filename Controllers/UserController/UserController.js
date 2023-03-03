import express from 'express'
import UserService from '../../Services/UserService/UserService.js';

const UserController = express.Router();
const user = new UserService();

UserController.put('/user/update', user.UpdateUser);
UserController.get('/user/:email', user.GetMySelf);

export default UserController;