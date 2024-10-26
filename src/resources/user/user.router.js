import express from "express";
import UserController from "../user/user.controller.js";

const userRouter = express.Router(); 
const userController = new UserController();
// Define routes

userRouter.post('/',userController.registerNow);
userRouter.post('/login',userController.login);


//-----
userRouter.delete('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        data: "delete id request"
    });
});

// Export the correct router
export default userRouter;
