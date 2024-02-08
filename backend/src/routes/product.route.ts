import { Router } from "express";
import { varifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.use(varifyJWT);

export default router;
