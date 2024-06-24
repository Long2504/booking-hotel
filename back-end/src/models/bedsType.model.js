import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";

const TABLE_NAME = "beds_type";

class BedsTypeModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            sequelize,
            {
                freezeTableName: true,
            }
        );
    }

    static associate() { }
}

export default BedsTypeModel;
