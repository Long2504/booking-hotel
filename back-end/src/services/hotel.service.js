import BedsTypeModel from "../models/bedsType.model.js";
import ExtensionModel from "../models/extension.model.js";
import HotelModel from "../models/hotel.model.js";
import HotelExtensionModel from "../models/hotelExtension.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import RoomsBedModel from "../models/roomBed.model.js";
import RoomsTypeModel from "../models/roomType.model.js";
import { BadRequestError } from "../utils/error.response.js";
import BaseService from "./base.service.js";
import HotelExtensionService from "./hotelExtension.service.js";
import HotelRoomService from "./hotelRoom.service.js";
import subExtensionService from "./subExtension.service.js";

class HotelService extends BaseService {
	async initHotel(listHotel) {
		try {
			const count = await this.count();
			if (count > 0) {
				return;
			}
			const promise = listHotel.map(async (hotel) => {
				await this.createAndPost(hotel);
			});

			await Promise.all(promise);
			return;
		} catch (error) {
			console.log("🚀 ~ file: hotel.service.js:26 ~ error:");
		}
	}

	async createAndPost(data) {
		const {
			name,
			description,
			address,
			images,
			star,
			hostId,
			extension,
			rooms,
		} = data;
		const hotel = await this.create({
			name,
			description,
			address,
			images,
			star,
			hostId,
			idPost: true,
		});
		await HotelExtensionService.createBulkHotelExtension(
			extension,
			hotel.id
		);
		await HotelRoomService.createBulkRoomForHotel(hotel.id, rooms);

		return hotel;
	}

	async getAll(options) {
		const whereCondition = {};
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: {
				exclude: ["idPost", "updatedAt", "deletedAt"],
			},
			include: [
				{
					model: HotelExtensionModel,
					as: "hotelExtensions",
					attributes: ["id", "extensionId", "subExtensions"],
					include: [
						{
							model: ExtensionModel,
							as: "extension",
							attributes: ["id", "name"],
						},
					],
				},
				{
					model: HotelRoomModel,
					as: "hotelRooms",
					attributes: {
						exclude: [
							"hotelId",
							"roomTypeId",
							"updatedAt",
							"deletedAt",
						],
					},
					include: {
						model: RoomsBedModel,
						as: "roomsBeds",
						attributes: ["id", "numBeds"],
						include: {
							model: BedsTypeModel,
							as: "bedType",
							attributes: ["id", "name"],
						},
					},
				},
			],
			order: [["createdAt", "DESC"]],
			distinct: true,
		};
		const { count, rows } = await this.getAndCountAll(options);
		const listHotel = rows.map(async (row) => {
			const listExtension = row?.hotelExtensions?.map(
				async (hotelExtension) => {
					if (hotelExtension?.subExtensions?.length > 0) {
						const listSubExtension =
							await subExtensionService.getListByListId(
								hotelExtension.subExtensions
							);
						hotelExtension.subExtensions = listSubExtension;
					}
					return hotelExtension;
				}
			);
			row.hotelExtensions = await Promise.all(listExtension);
			return row;
		});

		return {
			list: await Promise.all(listHotel),
			total: count,
		};
	}

	async generateListExtension(listExtension) {
		const list = listExtension?.map(async (hotelExtension) => {
			if (hotelExtension?.subExtensions?.length > 0) {
				const listSubExtension =
					await subExtensionService.getListByListId(
						hotelExtension.subExtensions
					);
                hotelExtension.subExtensions = listSubExtension;
                
            }
            hotelExtension.dataValues.name = hotelExtension.extension.name;
            delete hotelExtension.dataValues.extension;
			return hotelExtension;
        });

        return await Promise.all(list);
	}

	async getDetail(id) {
		if (!id) {
			throw new BadRequestError("Id not found");
		}
		const hotel = await this.get({
			where: { id: id },
			attributes: [
				"id",
				"name",
				"description",
				"address",
				"images",
				"star",
			],
			include: [
				{
					model: HotelExtensionModel,
					as: "hotelExtensions",
					attributes: ["id", "subExtensions"],
					include: [
						{
							model: ExtensionModel,
							as: "extension",
							attributes: ["id", "name"],
						},
					],
				},
				{
					model: HotelRoomModel,
					as: "hotelRooms",
					attributes: {
						exclude: [
							"hotelId",
							"roomTypeId",
							"updatedAt",
							"deletedAt",
						],
					},
                    include: [
                        {
                            model: RoomsTypeModel,
                            as: "roomType",
                            attributes: ["id", "name"],
                        },
                        {
						model: RoomsBedModel,
						as: "roomsBeds",
						attributes: ["id", "numBeds"],
						include: {
							model: BedsTypeModel,
							as: "bedType",
							attributes: ["id", "name"],
						},
					}],
				},
			],
		});
        hotel.hotelExtensions = await this.generateListExtension(
			hotel.hotelExtensions
		);
		return hotel;
	}
}

export default new HotelService(HotelModel);
