const express = require("express");//importing express
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");//SignUp,LogIn routes
const itemRoutes = require("./routes/itemRoutes");//Inventory Item Routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());//read JSON data sent from frontend

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Freshero Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
