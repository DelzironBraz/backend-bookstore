
import { PORT, mongoDB } from "./config.js";
import e, { response } from "express";
import express from "express"
import mongoose from "mongoose";
import { Book } from "./models/Book.js";

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to BookStore BackEnd')
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.post('/books', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400)
                .send({ message: 'Send all required fields: title, author, publishYear' });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Error while creating a book");
    }
});

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
