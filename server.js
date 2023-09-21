require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const path = require("path");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/producrRoutes");

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to my ecommerce app",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is runnimg on ${PORT}`);
});
