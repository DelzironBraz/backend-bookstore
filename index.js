
import express from "express"
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import booksRoute from './routes/bookRoutes.js';

dotenv.config();
const PORT = process.env.PORT;
const mongoDB = process.env.MONGODB_URI;
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to BookStore BackEnd')
});

// app.use(cors());

// CORS Policy
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
);

// express router
app.use('/books', booksRoute);

// Connect to MongoDB
mongoose
    .connect(mongoDB)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });
