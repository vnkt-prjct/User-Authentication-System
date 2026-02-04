require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/user");
const protectedRoute = require("./routes/protected");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", userRoutes);
app.use("/home", protectedRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to User Authentication System !!");
});

// -------------------- DB + SERVER --------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB CONNECTED");

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`🚀 App running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB CONNECTION FAILED");
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
