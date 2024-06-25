import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import UserModel from "./user.model.js";

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
                //options
                //Ex: tableName: "users",
                // Sequelize will infer the table name to be equal to the model name, without any modifications
                freezeTableName: true,
            }
        );
    }
    static associate() {}
}

export default HotelModel;
