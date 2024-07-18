"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("users", "display_name", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "first_name", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "last_name", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "phone", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "avatar_url", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "address", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("users", "photo_url", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("users", "display_name");
		await queryInterface.removeColumn("users", "first_name");
		await queryInterface.removeColumn("users", "last_name");
		await queryInterface.removeColumn("users", "phone");
		await queryInterface.removeColumn("users", "avatar_url");
		await queryInterface.removeColumn("users", "address");
		await queryInterface.removeColumn("users", "photo_url");
	},
};
