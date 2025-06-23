import express from 'express'
import cors from "cors"
import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";

import UserRouter from './Routers/UserRouter.js';
import LinkRouter from './Routers/LinkRouter.js';
import connectDB from './database.js';

connectDB()
const app = express()
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', UserRouter);
app.use('/links', LinkRouter);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
