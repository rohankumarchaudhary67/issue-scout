import dotenv from 'dotenv';

// Configure environment variables
dotenv.config({
    path: "./.env",
});

import { Server as HTTPServer } from "http";
import connectDB from './db';
import app from './app';
import scheduler from './fetcher/scheduler';


connectDB()
    .then(() => {
        app.on("error", (error: any) => {
            console.error("Something went wrong", error);
            throw error;
        });

        const server: HTTPServer = app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
            console.log("scheduler start");
            scheduler.start();
        });
    })
    .catch((error: any) => {
        console.error("MongoDB connection failed:", error);
    });