import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import MySqlDB from "./dbs/init.mysqldb.js";
import { checkOverload } from "./helper/check.connect.js";
import router from "./routes/index.route.js";
const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
MySqlDB;
checkOverload();
//init routes
app.use("/api", router);

//handle errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

export default app;
