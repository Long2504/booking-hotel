import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";

const TABLE_NAME = "room_types";

class RoomsTypeModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                description: {
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

    static associate() {}
}

export default RoomsTypeModel;
