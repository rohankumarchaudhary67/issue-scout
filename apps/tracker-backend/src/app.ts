import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(
    express.urlencoded({
        limit: "16kb",
        extended: true,
    })
);

app.use(express.static("public"));

app.use(cookieParser());


// Import routes
import healthCheckRouter from "./routes/health-check.routes";
import IssuesRouter from "./routes/get-issues.routes";

// Routes declaration
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/get-issues", IssuesRouter);


export default app;