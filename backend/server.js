import express from "express";
import cors from "cors";
import dbConnection from "./config/db.js";
import userRoutes from "./routes/user.rotes.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import path from "path";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/", (req, res) => {
  res.send("server is running on port 8000");
});

app.use("/api/users", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/dashboard", dashboardRoutes)

const PORT = 8000;
app.listen(PORT, () => {
    dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
