import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import UserModel from "./user.model.js";

const TABLE_NAME = "key_tokens";

class KeyToken extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    unique: true,
                    references: {
                        model: UserModel,
                        key: "id",
                    },
                },
                publicKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                privateKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                refreshToken: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                refreshTokenUsed: {
                    type: DataTypes.JSON,
                    allowNull: true,
                    defaultValue: [],
                },
            },
            sequelize,
            {
                freezeTableName: true,
            }
        );
    }
}

export default KeyToken;
