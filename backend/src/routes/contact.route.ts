import { Router } from "express";

import { contactUs } from "../controller/contact.controller";
import { varifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.use(varifyJWT);

router.route("/").post(contactUs);

export default router;
