const express = require("express");
// const passport = require("passport");
const { signToken } = require("../utils/jwtToken");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// require("../middleware/passport");

const userRouter = express.Router();


userRouter.get("/me", authController.protect, authController.getMe);

userRouter.route("/sign-in").post(authController.singIn);
userRouter.route("/sign-up").post(authController.signup);
userRouter.route("/verify-email").post(authController.verifyEmail);
userRouter.route("/forget-password").post(authController.forgetPassword);
userRouter.route("/reset-password/:token").patch(authController.resetPassword);


userRouter
  .route("/change-password")
  .patch(authController.protect, authController.changePassword);

userRouter.get("/",authController.protect, userController.getAllUsers);
userRouter.patch("/cart/add", authController.protect, userController.addToCart);
userRouter.delete(
  "/cart/remove",
  authController.protect,
  userController.removeFromCart
);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
