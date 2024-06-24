"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "hotel_rooms",
            "hotel_rooms_ibfk_2"
        );
        await queryInterface.addConstraint("hotel_rooms", {
            fields: ["room_type_id"],
            type: "foreign key",
            name: "fk_roomTypeId",
            references: {
                table: "room_types",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "hotel_rooms",
            "hotel_rooms_ibfk_2"
        );
        await queryInterface.addConstraint("hotel_rooms", {
            fields: ["room_type_id"],
            type: "foreign key",
            name: "roomTypeId",
            references: {
                table: "room_beds",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },
};
