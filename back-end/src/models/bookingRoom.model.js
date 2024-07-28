import { DataTypes } from "sequelize";
import BaseModel from "./base.model.js";
import HotelRoomModel from "./hotelRoom.model.js";
import { ORDER_BY } from "./enum.model.js";
import OrderModel from "./order.model.js";

const TABLE_NAME = "booking_rooms";

class BookingRoomModel extends BaseModel {
	static init(sequelize) {
		super.init(
			TABLE_NAME,
			{
				roomId: {
					type: DataTypes.UUID,
					allowNull: false,
					references: {
						model: HotelRoomModel,
						key: "id",
					},
				},
				checkInDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				checkOutDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				numRooms: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				bookingDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				orderBy: {
                    type: DataTypes.ENUM(),
                    values: Object.values(ORDER_BY),
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				phone: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				customerName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				address: {
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
		this.belongsTo(HotelRoomModel, {
			foreignKey: "roomId",
			as: "hotelRoom",
		});
		this.hasOne(OrderModel, {
			foreignKey: "bookingRoomId",
			as: "order",
		});
	}
}

export default BookingRoomModel;
