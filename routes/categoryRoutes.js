const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

//Create
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  categoryController.create
);

//Update
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.update
);

//Get All Categories
router.get("/get-category", categoryController.getAll);

//Get Single Category
router.get("/single-category/:slug", categoryController.getSingle);

//Delete
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.delete
);

module.exports = router;
