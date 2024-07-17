import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";

const TABLE_NAME = "media_files";

class MediaFileModel extends BaseModel {
	static init(sequelize) {
		super.init(
			TABLE_NAME,
			{
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				contentType: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				data: {
					type: DataTypes.BLOB("long"),
					allowNull: false,
				},
			},
			sequelize,
			{
				freezeTableName: true,
			}
		);
	}
}

export default MediaFileModel;
