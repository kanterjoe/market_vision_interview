import express from "express";
import db from "./models"
import mongoose from "mongoose";
import routes from "./routes"
import ejwt from 'express-jwt';
import bodyParser from 'body-parser';

const PORT = process.env.port || 3001;
const MONGO_CONNECTION = process.env.MONGOOSE || 'mongodb://localhost:27017/market_vision_interview';

mongoose.connect(MONGO_CONNECTION, {useNewUrlParser: true});



const app = express();
app.use(bodyParser.json());


app.use("/", routes);

import _ from './util/makeProducts'
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
;