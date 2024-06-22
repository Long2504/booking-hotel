import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db


//init routes


//handle errors


export default app;
