import BedsTypeModel from "../models/bedsType.model.js";
import ExtensionModel from "../models/extension.model.js";
import HotelModel from "../models/hotel.model.js";
import HotelExtensionModel from "../models/hotelExtension.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import RoomsBedModel from "../models/roomBed.model.js";
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
				await this.create(hotel);
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
			extensions,
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
			extensions,
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
}

export default new HotelService(HotelModel);
