import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import BedsTypeModel from "./bedsType.model.js";
import HotelRoomModel from "./hotelRoom.model.js";

const TABLE_NAME = "room_beds";

class RoomsBedModel extends BaseModel {
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
                hotelRoomId: {   
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: HotelRoomModel,
                        key: "id",
                    },
                }
            },
            sequelize,
            {
                freezeTableName: true,
            }
        );
    }

    static associate() {
        this.belongsTo(BedsTypeModel, {
            foreignKey: "bedId",
            as: "bedType",
        });
    }
}

export default RoomsBedModel;
