import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

// Import middlewares
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

// Import routes (to be created)
import indexRoutes from "./routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-origin resource sharing

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://tourist-pay-gmaa.vercel.app",
  "https://tourist-pay-gmaa.vercel.app/login",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); // Causes issues with Express 5 getter properties

// Data sanitization against XSS
// app.use(xss()); // Causes issues with Express 5 getter properties

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter);

// Set static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API Routes
app.use("/api", indexRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
