import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import BedsTypeModel from "./bedsType.model.js";

const TABLE_NAME = "room_beds";

class RoomsBed extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                numBeds: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                bedId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: BedsTypeModel,
                        key: "id",
                    },
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

export default RoomsBed;
