import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import BookingRoomModel from "./bookingRoom.model.js";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "./enum.model.js";

const TABLE_NAME = "orders";

class OrderModel extends BaseModel {
	static init(sequelize) {
		super.init(
			TABLE_NAME,
			{
				note: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				paymentDate: {
					type: DataTypes.DATE,
					allowNull: true,
				},
				paymentStatus: {
                    type: DataTypes.ENUM(),
                    values: Object.values(PAYMENT_STATUS),
					allowNull: false,
				},
				paymentMethod: {
                    type: DataTypes.ENUM(),
                    values: Object.values(PAYMENT_METHOD),
					allowNull: false,
				},
				bookingRoomId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: BookingRoomModel,
						key: "id",
					},
				},
				totalPrice: {
					type: DataTypes.FLOAT,
					allowNull: false,
				}
			},
			sequelize,
			{
				freezeTableName: true,
			}
		);
	}

	static associate() {
		this.belongsTo(BookingRoomModel, {
			foreignKey: "bookingRoomId",
			targetKey: "id",
			as: "bookingRoom",
		});
	}
}

export default OrderModel;
