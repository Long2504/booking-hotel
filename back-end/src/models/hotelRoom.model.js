import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import HotelModel from "./hotel.model.js";
import RoomsType from "./roomType.model.js";

const TABLE_NAME = "hotel_rooms";

class HotelRoomModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                area: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                numBathrooms: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                numBedrooms: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                images: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                hotelId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: HotelModel,
                        key: "id",
                    },
                },
                roomTypeId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: RoomsType,
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

export default HotelRoomModel;
