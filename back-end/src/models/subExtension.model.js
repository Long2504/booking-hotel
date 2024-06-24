import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import ExtensionModel from "./extension.model.js";

const TABLE_NAME = "sub_extensions";

class SubExtensionModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                extensionId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: ExtensionModel,
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

export default SubExtensionModel;
