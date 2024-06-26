import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import HotelModel from "./hotel.model.js";
import ExtensionModel from "./extension.model.js";

const TABLE_NAME = "hotel_extensions";

class HotelExtensionModel extends BaseModel {
    static init(sequelize) {
        super.init(
            TABLE_NAME,
            {
                hotelId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: HotelModel,
                        key: "id",
                    },
                },
                extensionId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: ExtensionModel,
                        key: "id",
                    },
                },
                subExtensions: {
                    type: DataTypes.JSON,
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
        this.belongsTo(ExtensionModel, {
            foreignKey: "extensionId",
            as: "extension",
        })  
    }
}

export default HotelExtensionModel;
