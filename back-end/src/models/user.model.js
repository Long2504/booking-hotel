import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";

const TABLE_NAME = "users";

class UserModel extends BaseModel {
	static init(sequelize) {
		super.init(
			TABLE_NAME,
			{
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
				displayName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				phone: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				avatarUrl: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				address: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				photoUrl: {
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
