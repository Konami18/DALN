import events from "events";
events.EventEmitter.defaultMaxListeners = 20;
import express from "express"
import cors from "cors"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/product/foodRoute.js"
import userRouter from "./routes/user/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/user/cartRoute.js"
import orderRoute from "./routes/order/orderRoute.js"
import reviewRouter from "./routes/product/reviewRoute.js"
import promoRouter from "./routes/product/promoRoute.js"
import favoriteRouter from "./routes/user/favoriteRoute.js"
import addressRouter from "./routes/user/addressRoute.js"
import loyaltyRouter from "./routes/user/loyaltyRoute.js"
import flashSaleRouter from "./routes/product/flashSaleRoute.js"
import recommendationRouter from "./routes/analytics/recommendationRoute.js"
import analyticsRouter from "./routes/analytics/analyticsRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// static uploads
app.use("/images", express.static(path.join(__dirname, "uploads")))

// api endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRoute)
app.use("/api/review", reviewRouter)
app.use("/api/promo", promoRouter)
app.use("/api/favorite", favoriteRouter)
app.use("/api/address", addressRouter)
app.use("/api/loyalty", loyaltyRouter)
app.use("/api/flashsale", flashSaleRouter)
app.use("/api/recommendation", recommendationRouter)
app.use("/api/analytics", analyticsRouter)

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" })
})

// Unknown API endpoints return 404 JSON instead of falling through to client HTML
app.all("/api{/*path}", (req, res) => {
    res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Admin Client (SPA)
const adminDist = path.resolve(__dirname, "../admin/dist");
if (fs.existsSync(adminDist)) {
    app.use("/admin", express.static(adminDist));
    app.get("/admin{/*path}", (req, res) => {
        res.sendFile(path.join(adminDist, "index.html"));
    });
}

// Frontend Client (SPA)
const frontendDist = path.resolve(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get("{/*path}", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

// Dev fallback if client dist has not been built
app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


