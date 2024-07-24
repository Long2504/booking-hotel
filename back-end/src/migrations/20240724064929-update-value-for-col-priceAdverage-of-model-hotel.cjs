"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const listHotel = require("../cfg/hotelList.cfg.json");
		const transaction = await queryInterface.sequelize.transaction();

		try {
			for (const hotel of listHotel) {
				await queryInterface.bulkUpdate(
					"hotels",
					{ price_average: hotel.priceAverage },
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
				console.log("🚀 ~ file: 20240724064909-update-value-for-col-priceAdverage-of-model-hotel.cjs:32 ~ hotel:", hotel)
				await queryInterface.bulkUpdate(
					"hotels",
					{ price_average: null }, // Assuming null is the old value
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
