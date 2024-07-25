"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("hotels", "location", {
			type: Sequelize.JSON,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("hotels", "location");
	},
};
