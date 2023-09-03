const express = require("express");

const authController = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//register
router.post("/register", authController.registerController);
//login
router.post("/login", authController.loginController);
//Forgot - Password
router.post("/forgot-password", authController.forgotpasswordController);
//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log("admin dashboard");
  res.status(200).json({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, authController.update);

//orders
router.get("/orders", requireSignIn, authController.orders);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, authController.allorders);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  authController.orderStatus
);

module.exports = router;
