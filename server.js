require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/producrRoutes");

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is runnimg on ${PORT}`);
});
