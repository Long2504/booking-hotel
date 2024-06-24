import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import SubExtensionModel from "./subExtension.model.js";

const TABLE_NAME = "extensions";

class ExtensionModel extends BaseModel {
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
    static associate() {
        this.hasMany(SubExtensionModel, {
            foreignKey: "extensionId",
            as: "subExtensions",
        })
    }
}

export default ExtensionModel;
