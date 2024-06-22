"use strict";

import MySqlDB from "../dbs/init.mysqldb.js";
import os from "os";
import process from "process";

const _SECONDS = 30000; // 30 seconds

// check overload
const checkOverload = () => {
    setInterval(async () => {
        const numConnections = await MySqlDB.getNumberOfConnections();
        const numCores = os.cpus().length;
        console.log(
            "🚀 ~ file: check.connect.js:13 ~ numCores:",
            numCores,
            "core"
        );
        const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
        console.log(
            "🚀 ~ file: check.connect.js:15 ~ memoryUsage:",
            Math.floor(memoryUsage),
            "MB"
        );
        //Example maximum number of connections: 32
        const maxConnections = numCores * 2;
        if (numConnections > maxConnections) {
            console.log("🚀 Connections overload");
        }
    }, _SECONDS);
};

export { checkOverload };
