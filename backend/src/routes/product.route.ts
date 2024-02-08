import { upload } from "./../middleware/multer.middleware";
import { Router } from "express";
import { varifyJWT } from "../middleware/auth.middleware";
import {
  createProduct,
  deteteProduct,
  getProducts,
  getSingleProduct,
} from "../controller/product.controller";

const router = Router();

router.use(varifyJWT);

router.route("/create-product").post(upload.single("image"), createProduct);
router.route("/get-products").get(getProducts);

router.route("/get-product/:id").get(getSingleProduct);
router.route("/delete-product/:id").delete(deteteProduct);

export default router;
