import express from "express";
// import db from "./models"
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import routes from "./routes"


const PORT = process.env.PORT || 3001;
const MONGO_CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/market_vision_interview';

mongoose.connect(MONGO_CONNECTION, {useNewUrlParser: true});



const app = express();
app.use(bodyParser.json());


app.use("/", routes);

app.get("*", (req,res,err) => res.sendFile("client/build"))
import _ from './util/makeProducts'
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
;