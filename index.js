
import { PORT, mongoDB } from "./config.js";
import express from "express"
import mongoose from "mongoose";
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

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
