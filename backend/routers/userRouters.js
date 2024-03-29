import express from 'express';
import data from '../data.js';
import User from '../models/userModels.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler( async (req, res) => {
    // await User.remove({});
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res)=> {
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(req.body.password === user.password ){
            res.send({
                _id: user._id,
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message:'Invalid User email/password'});
}))

export default userRouter;