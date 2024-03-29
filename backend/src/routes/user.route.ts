import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  loggedInStatus,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controller/user.controller";
import { varifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/loggedIn-status").get(loggedInStatus);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").put(resetPassword);

router.route("/logout").get(varifyJWT, logoutUser);
router.route("/user-data").get(varifyJWT, getUser);
router
  .route("/update-user")
  .patch(varifyJWT, upload.single("photo"), updateUser);

router.route("/change-password").patch(varifyJWT, changePassword);

export default router;
