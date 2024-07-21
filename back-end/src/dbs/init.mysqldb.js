"use strict";
import { Sequelize } from "sequelize";
import config from "../configs/config.js";
import ListModel from "./listModel.mysql.js";
import initData from "../cfg/index.cfg.js";
class MySqlDB {
    sequelize;
    constructor() {
        this.connect();
    }

    async connect() {
        const { dialect, host, port, username, password, database } =
            config.db;
        try {
            this.sequelize = new Sequelize({
                dialect,
                host,
                port,
                username,
                password,
                database,
            });
            this.initSequelize(this.sequelize);
            await this.sequelize.sync();
            await this.sequelize.authenticate();
            await initData();
            console.log("Connection has been established successfully.");
            console.log(
                `Number of active connections: ${await this.getNumberOfConnections()}`
            );
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }

    async initSequelize(sequelize) {
        for (const model of ListModel) {
            model.init(sequelize);
        }
        for (const model of ListModel) {
            
            model.associate();
        }
    }

    static getInstance() {
        if (!MySqlDB.instance) {
            MySqlDB.instance = new MySqlDB();
        }
        return MySqlDB.instance;
    }

    async getNumberOfConnections() {
        try {
            const [results, _] = await this.sequelize.query(
                "SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.PROCESSLIST"
            );
            const numberOfConnections = results[0].count;
            return numberOfConnections;
        } catch (error) {
            console.error(
                "Unable to connect to the database or retrieve connections:",
                error
            );
        }
    }
}
const DbMySql = MySqlDB.getInstance();
export default DbMySql;
