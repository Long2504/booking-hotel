import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import UserModel from "./user.model.js";
import HotelExtensionModel from "./hotelExtension.model.js";
import HotelRoomModel from "./hotelRoom.model.js";

const TABLE_NAME = "hotels";

class HotelModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                star: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                images: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                hostId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: UserModel,
                        key: "id",
                    },
                },
                idPost: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
                },
            },
            sequelize,
            {
                freezeTableName: true,
            }
        );
    }
    static associate() {
        this.hasMany(HotelExtensionModel, {
            foreignKey: "hotelId",
            as: "hotelExtensions",
        });
        this.hasMany(HotelRoomModel, {
            foreignKey: "hotelId",
            as: "hotelRooms",
        });
    }
}

export default HotelModel;
