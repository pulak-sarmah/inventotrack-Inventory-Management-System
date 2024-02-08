import { upload } from "./../middleware/multer.middleware";
import { Router } from "express";
import { varifyJWT } from "../middleware/auth.middleware";
import { createProduct } from "../controller/product.controller";

const router = Router();

router.use(varifyJWT);

router.route("/create-product").post(upload.single("image"), createProduct);

export default router;
