const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const {isLoggedin} = require('../middlewares/user.authentication');



//Backend Uer Routes

//Login and Logout

//Open Routes

userRouter.post("/login", userController.loginUser);
userRouter.post("/create",userController.createUser);

//PROTECTED ROUTES

userRouter.post("/logout", isLoggedin, userController.logoutUser);

userRouter.get("/", isLoggedin,userController.findUserById);

userRouter.put("/", isLoggedin,userController.updateUserById);

userRouter.delete("/", isLoggedin,userController.deleteUserById);

module.exports = userRouter;