import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { varifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(varifyJWT, logoutUser);
router.route("/user-data").get(varifyJWT, getUser);

export default router;
