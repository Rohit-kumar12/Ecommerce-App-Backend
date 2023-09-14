const express = require("express");

const productController = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const multer = require("multer");
const fs = require("fs");
const multermiddleware = require("../middlewares/multermiddleware");

const router = express.Router();

// const uploadDir = "./uploads";

// // Create the "uploads" directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

//create_product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  multermiddleware,
  productController.create
);

// update_product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  productController.update
);

//get_products
router.get("/get-product", productController.get);

//get_single_product
router.get("/get-product/:slug", productController.getSingle);

//get_photo
router.get("/product-photo/:pid", productController.getPhoto);

//delete rproduct
router.delete("/delete-product/:pid", productController.delete);

//filter product
router.post("/product-filters", productController.filter);

//product count
router.get("/product-count", productController.count);

//product per page
router.get("/product-list/:page", productController.countPerPage);

//search product
router.get("/search/:keyword", productController.search);

//similar product
router.get("/related-product/:pid/:cid", productController.similar);

//category wise product
router.get("/product-category/:slug", productController.category);

//payments routes
//token
router.get("/braintree/token", productController.braintreeToken);

//payments
router.post("/braintree/payment", requireSignIn, productController.payment);

module.exports = router;
