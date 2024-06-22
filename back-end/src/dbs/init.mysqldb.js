"use strict";
import { Sequelize } from "sequelize";
import configMysql from "../configs/config.js";
import ListModel from "./listModel.mysql.js";
class MySqlDB {
    sequelize;
    constructor() {
        this.connect();
    }

    async connect() {
        const { dialect, host, port, username, password, database } =
            configMysql.db;
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
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }

    async initSequelize(sequelize) {
        for (const model of ListModel) {
            model.init(sequelize);
        }
    }

    static getInstance() {
        if (!MySqlDB.instance) {
            MySqlDB.instance = new MySqlDB();
        }
        return MySqlDB.instance;
    }
}
const DbMySql = MySqlDB.getInstance();
export default DbMySql;
