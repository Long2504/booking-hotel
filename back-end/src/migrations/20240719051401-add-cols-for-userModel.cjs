"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("users", "birthday", {
			type: Sequelize.DATE,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "description", {
			type: Sequelize.TEXT,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "birthday");
    await queryInterface.removeColumn("users", "description");
	},
};
