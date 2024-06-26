"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("room_beds", "hotel_room_id", {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "hotel_rooms",
                key: "id",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("room_beds", "hotel_room_id");
    },
};
