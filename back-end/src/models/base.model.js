import { DataTypes, Model } from "sequelize";

class BaseModel extends Model {
    static init(modelName, attributes, sequelize, options) {
        const baseAttributes = {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            createAt: {
                field: "created_at",
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updateAt: {
                field: "updated_at",
                type: DataTypes.DATE,
                defaultValue: null,
            },
            deleteAt: {
                field: "deleted_at",
                type: DataTypes.DATE,
                defaultValue: null,
            },
        };
        const mergeAttributes = { ...baseAttributes, ...attributes };
        const mergeOptions = Object.assign(
            {
                paranoid: true,
                timestamps: true,
                updateAt: false,
                underscored: true,
                modelName,
                sequelize,
            },
            options
        );
        super.init(mergeAttributes, mergeOptions);
    }
}


export default BaseModel;
