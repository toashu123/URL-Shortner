// server.js - UPDATED VERSION
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables FIRST

import express from "express";
import { error404 } from "./src/utils/middlewares/404.js";
import { userRoutes } from "./src/api/v1/routes/user-routes.js";
import { connectToDb } from "./src/utils/db/connection.js";
import { shortRoute } from './src/api/v1/routes/url-short-routes.js';
import cors from 'cors';


const app = express();

// Debug: Check if environment variables are loaded
console.log('DB_URL:', process.env.DB_URL ? 'Found' : 'NOT FOUND');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Found' : 'NOT FOUND');

app.use(cors());
app.use(express.json());

// Remove /api/v1 prefix as discussed
app.use('/', userRoutes);
app.use('/',shortRoute);

app.use(error404);

const promise = connectToDb();
promise.then((result) => {
    console.log('Database connection success');
    const server = app.listen(1234, (err) => {
        if (err) {
            console.log("Server crash", err);
        } else {
            console.log("Server is running on port", server.address().port);
        }
    });
}).catch((err) => {
    console.log("Database connection fails", err);
});
