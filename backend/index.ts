import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import config from "./config";
import userRouter from "./routers/users";
import cocktailRouter from "./routers/cocktails";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/cocktails', cocktailRouter)

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

void run();