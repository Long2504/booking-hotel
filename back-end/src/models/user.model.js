import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";

const TABLE_NAME = "users";

class UserModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                oauthProvider: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                oauthId: {
                    type: DataTypes.STRING,
                    allowNull: true,
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
}

export default UserModel;
