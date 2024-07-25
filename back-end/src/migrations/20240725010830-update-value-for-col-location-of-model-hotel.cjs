"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const listHotel = require("../cfg/hotelList.cfg.json");
		const transaction = await queryInterface.sequelize.transaction();
		const localCity = {
			13170: ["79"], // HCM
			17190: ["77"], //Vũng Tàu
			16440: ["48"], //Đà Nẵng
			2758: ["01"], //Hà Nội
			15932: ["68", "672"], //Đà Lạt (Lâm Đồng)
			2679: ["56", "568"], // Nha Trang ( Khách Hòa)
			17182: ["22", "193"], //Hạ Long (Quảng Ninh)
			3738: ["46", "474"], // TP Huế (Thừa Thiên Huế)
			17242: ["52", "540"], // Quy Nhơn (Bình Định)
			16079: ["92"], //Cần Thơ
			16552: ["49", "503"], //Hội An (Quảng Nam)
		};
		try {
			for (const hotel of listHotel) {
				await queryInterface.bulkUpdate(
					"hotels",
					{ location: localCity[hotel.codeCity] },
					{ name: hotel.name },
					{ transaction }
				);
			}

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	async down(queryInterface, Sequelize) {
		const listHotel = require("../cfg/hotelList.cfg.json");
		const transaction = await queryInterface.sequelize.transaction();

		try {
			for (const hotel of listHotel) {
				await queryInterface.bulkUpdate(
					"hotels",
					{ location: null },
					{ name: hotel.name },
					{ transaction }
				);
			}

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},
};
