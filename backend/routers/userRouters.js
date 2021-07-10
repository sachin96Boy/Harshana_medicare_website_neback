import express from 'express';
import data from '../data.js';
import User from '../models/userModels.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler( async (req, res) => {
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
}));

export default userRouter;