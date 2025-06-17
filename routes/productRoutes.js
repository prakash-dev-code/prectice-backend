const express = require("express");
const productController = require("../controllers/productControlller");
const upload = require("../config/s3");
// const passport = require("passport");
// const authController = require("../controllers/authController");

const productRouter = express.Router();

// Load auth page (optional)

productRouter
  .route("/")
  //   .all(authController.loadAuth) // apply auth before any method if needed
  .get(productController.getAllProduct)
  .post(upload.array("images", 5), productController.createProduct);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
