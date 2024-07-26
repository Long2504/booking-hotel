import { Op, Sequelize } from "sequelize";
import bookingRoomService from "./bookingRoom.service.js";
import dayjs from "dayjs";
import BookingRoomModel from "../models/bookingRoom.model.js";
import OrderModel from "../models/order.model.js";
import HotelModel from "../models/hotel.model.js";
class StatisticsService {
	async getForDashboardAdmin() {
		const statisticsBookingOfInWeek = await this.getDataBookingOfInWeek();
		const statisticsRevenue = await this.getDataRevenue();
		const statisticsRevenueOfMonth = await this.getDataRevenueOfMonth();
		statisticsRevenueOfMonth.totalPriceInMonth =
			statisticsRevenue.totalPriceInMonth;
		statisticsRevenue.totalPriceInWeek =
			statisticsRevenueOfMonth.totalPriceOfWeek;
        const listHotel = await HotelModel.findAll({
			attributes: ["id", "name"],
			limit: 6,
			order: [["createdAt", "DESC"]],
		});

		return {
			statisticsBookingOfInWeek,
			statisticsRevenue,
			statisticsRevenueOfMonth,
			listHotel,
		};
	}

	async getDataBookingOfInWeek() {
		const totalBooking = await bookingRoomService.count();
		const totalBookingInMonth = await bookingRoomService.count({
			where: {
				createdAt: {
					[Op.gte]: new Date(
						new Date().getFullYear(),
						new Date().getMonth(),
						1
					),
				},
			},
		});
		const totalOfInWeek = await bookingRoomService.count({
			where: {
				createdAt: {
					[Op.gte]: new Date(
						new Date().getFullYear(),
						new Date().getMonth(),
						new Date().getDate() - 7
					),
				},
			},
		});
		const startDate = dayjs()
			.startOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const endDate = dayjs()
			.endOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const dataOfWeek = await BookingRoomModel.findAll({
			where: {
				createdAt: {
					[Op.and]: [{ [Op.gte]: startDate }, { [Op.lte]: endDate }],
				},
			},
			attributes: [
				[
					Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')"),
					"date",
				],
				[Sequelize.fn("COUNT", "id"), "bookings"],
			],
			group: [Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')")],
			raw: true,
		});

		return { totalBooking, totalBookingInMonth, totalOfInWeek, dataOfWeek };
	}

	async getDataRevenue() {
		const totalPriceAll = await OrderModel.sum("totalPrice");
		const totalPriceInMonth = await OrderModel.sum("totalPrice", {
			where: {
				createdAt: {
					[Op.gte]: new Date(
						new Date().getFullYear(),
						new Date().getMonth(),
						1
					),
				},
			},
		});

		const startDate = dayjs()
			.startOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const endDate = dayjs()
			.endOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const totalDataOfWeek = await OrderModel.findAll({
			where: {
				createdAt: {
					[Op.and]: [{ [Op.gte]: startDate }, { [Op.lte]: endDate }],
				},
			},
			attributes: [
				[
					Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')"),
					"date",
				],
				[
					Sequelize.fn("SUM", Sequelize.col("total_price")),
					"totalPrice",
				],
			],
			group: [Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')")],
			raw: true,
		});
		return { totalPriceAll, totalPriceInMonth, totalDataOfWeek };
	}

	async getDataRevenueOfMonth() {
		const startDate = dayjs().startOf("month").format("YYYY-MM-DD");
		const endDate = dayjs().endOf("month").format("YYYY-MM-DD");

		const totalDataOfMonth = await OrderModel.findAll({
			where: {
				createdAt: {
					[Op.and]: [{ [Op.gte]: startDate }, { [Op.lte]: endDate }],
				},
			},
			attributes: [
				[
					Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')"),
					"date",
				],
				[
					Sequelize.fn("SUM", Sequelize.col("total_price")),
					"totalPrice",
				],
			],
			group: [Sequelize.literal("DATE_FORMAT(created_at, '%Y-%m-%d')")],
			raw: true,
		});

		const startDateLastMonth = dayjs()
			.subtract(1, "month")
			.startOf("month")
			.format("YYYY-MM-DD");
		const endDateLastMonth = dayjs()
			.subtract(1, "month")
			.endOf("month")
			.format("YYYY-MM-DD");
		const totalPriceOfLastMonth = await OrderModel.sum("totalPrice", {
			where: {
				createdAt: {
					[Op.and]: [
						{ [Op.gte]: startDateLastMonth },
						{ [Op.lte]: endDateLastMonth },
					],
				},
			},
		});

		const startDateLastWeek = dayjs()
			.subtract(1, "week")
			.startOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const endDateLastWeek = dayjs()
			.subtract(1, "week")
			.endOf("week")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const totalPriceOfLastWeek =
			(await OrderModel.sum("totalPrice", {
				where: {
					createdAt: {
						[Op.and]: [
							{ [Op.gte]: startDateLastWeek },
							{ [Op.lte]: endDateLastWeek },
						],
					},
				},
			})) || 0;
		const startDateWeek = dayjs().startOf("week").add(1, "days");
		const endDateWeek = dayjs().endOf("week").add(1, "days");
		const totalPriceOfWeek =
			(await OrderModel.sum("totalPrice", {
				where: {
					createdAt: {
						[Op.and]: [
							{ [Op.gte]: startDateWeek },
							{ [Op.lte]: endDateWeek },
						],
					},
				},
			})) || 0;
		const today = dayjs().startOf("day");
		const totalPriceToday = await OrderModel.sum("totalPrice", {
			where: {
				createdAt: {
					[Op.gte]: today,
					[Op.lt]: dayjs(today).endOf("day"),
				},
			},
		});
		const totalPriceYesterday = await OrderModel.sum("totalPrice", {
			where: {
				createdAt: {
					[Op.gte]: dayjs(today).subtract(1, "day"),
					[Op.lt]: dayjs(today)
						.subtract(1, "day")
						.endOf("day")
						,
				},
			},
		});

		return {
			totalDataOfMonth,
			totalPriceOfLastMonth,
			totalPriceOfWeek,
			totalPriceOfLastWeek,
			totalPriceToday,
			totalPriceYesterday,
		};
	}
}

export default new StatisticsService();
