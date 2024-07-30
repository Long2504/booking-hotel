import { Op, Sequelize, where } from "sequelize";
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
import bookingRoomService from "./bookingRoom.service.js";
import DbMySql from "../dbs/init.mysqldb.js";
import UserModel from "../models/user.model.js";

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
			id,
			name,
			description,
			address,
			images,
			star,
			hostId,
			extension,
			rooms,
		} = data;
		let hotel;
		if(id) {
			hotel = await this.updateById(id, {
				name,
				description,
				address,
				images,
				star,
				hostId,
				idPost: true,
			});
			await HotelExtensionService.deleteBulkHotelExtension(
				id
			);
			await HotelRoomService.deleteBulkRoomForHotel(id);
		}
		else {			
			hotel = await this.create({
				name,
				description,
				address,
				images,
				star,
				hostId,
				idPost: true,
			});
		}
		await HotelExtensionService.createBulkHotelExtension(
			extension,
			hotel.id
		);
		await HotelRoomService.createBulkRoomForHotel(hotel.id, rooms);

		return hotel;
	}

	async createAndSaveDraft(data) {
		const {
			id,
			name,
			description,
			address,
			images,
			star,
			hostId,
			extension,
			rooms,
		} = data;
		let hotel;
		if (id) {
			hotel = await this.updateById(id, {
				name,
				description,
				address,
				images,
				star,
				hostId,
				idPost: false,
			});
			await HotelExtensionService.deleteBulkHotelExtension(id);
			await HotelRoomService.deleteBulkRoomForHotel(id);
		} else {
			hotel = await this.create({
				name,
				description,
				address,
				images,
				star,
				hostId,
				idPost: false,
			});
		}
		await HotelExtensionService.createBulkHotelExtension(
			extension,
			hotel.id
		);
		if (rooms?.length > 0) {
			await HotelRoomService.createBulkRoomForHotel(hotel.id, rooms);
		}

		return hotel;
	}

	async deleteDraft(id, hostId) {
		const hotel = await this.getById(id, {
			where: {
				idPost: false,
			},
		});
		if (hotel.hostId !== hostId) {
			throw new BadRequestError("You are not owner of this hotel");
		}

		await this.removeById(id);
		await HotelExtensionService.deleteBulkHotelExtension(id);
		await HotelRoomService.deleteBulkRoomForHotel(id);
	}

	async getAll(options) {
		let whereCondition = {};

		// query search hotel by name or address
		if (options.searchQuery) {
			whereCondition = {
				[Op.or]: [
					{ name: { [Op.like]: `%${options.searchQuery}%` } },
					{
						address: {
							[Op.like]: `%${options.searchQuery}%`,
						},
					},
				],
			};
		}
		// query hotel by star
		if (options.multiStar.length > 0) {
			whereCondition.star = {
				[Op.in]: options.multiStar,
			};
		}

		const listRoomIdNotEmpty = await bookingRoomService.getList({
			startDate: options.startDate,
			endDate: options.endDate,
			roomNumber: options.roomNumber,
			peopleNumber: options.peopleNumber,
		});

		// query hotel by price
		if (options.maximumPrice > 0 && options.minimumPrice !== 0) {
			whereCondition.priceAverage = {
				[Op.between]: [options.maximumPrice, options.minimumPrice],
			};
		}

		// query hotel by city

		if (options.multiCity.length > 0) {
			const conditions = options.multiCity.map((locationValue) =>
				Sequelize.where(
					Sequelize.fn(
						"JSON_CONTAINS",
						Sequelize.col("location"),
						JSON.stringify(locationValue)
					),
					1
				)
			);
			whereCondition[Op.or] = {
				[Op.or]: conditions,
			};
		}

		// get price max and min
		const temp = await DbMySql.sequelize.query(
			"Select max(priceAverage) as 'priceMax', min(priceAverage) as 'priceMin' from (Select `hotels`.`price_average` as priceAverage, `hotels`.`id` from `hotels` inner join `hotel_rooms` on `hotel_rooms`.`hotel_id` = `hotels`.`id` where `hotels`.`deleted_at` is null group by `hotel_rooms`.`hotel_id`) as t"
		);

		const priceMax = temp[0][0].priceMax;
		const priceMin = temp[0][0].priceMin;

		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: {
				exclude: ["idPost", "updatedAt", "deletedAt"],
			},
			include: [
				{
					model: HotelRoomModel,
					as: "hotelRooms",
					attributes: ["id"],
					where: {
						id: {
							[Op.not]: listRoomIdNotEmpty,
						},
					},
				},
			],
			order: [["createdAt", "DESC"]],
			distinct: true,
		};
		const { count, rows } = await this.getAndCountAll(options);

		return {
			list: rows,
			total: count,
			priceMax: priceMax,
			priceMin: priceMin,
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

	async getDetail(id, options) {
		if (!id) {
			throw new BadRequestError("Id not found");
		}
		const listRoomIdNotAvailable =
			await bookingRoomService.getListIdRoomNotAvailableByIdHotel(
				id,
				options
			);
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
					where: {
						id: {
							[Op.not]: listRoomIdNotAvailable,
						},
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
						},
					],
				},
			],
		});
		hotel.hotelExtensions = await this.generateListExtension(
			hotel.hotelExtensions
		);
		hotel.hotelRooms = hotel.hotelRooms.map((hotelRoom) => {
			hotelRoom.dataValues.numBedrooms = options?.roomNumber || 1;
		});
		return hotel;
	}

	async getDetailForHostDraft(id, hostId) {
		if (!id || !hostId) {
			throw new BadRequestError("Id not found");
		}
		const whereCondition = {
			id: id,
			hostId: hostId,
			idPost: false,
		};
		const hotel = await this.get({
			where: whereCondition,
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
						},
					],
				},
			],
		});

		const extension = {};
		hotel.hotelExtensions.forEach((hotelExtension) => {
			extension[hotelExtension.extension.id] =
				hotelExtension.subExtensions;
		});
		hotel.dataValues.extension = extension;
		delete hotel.dataValues.hotelExtensions;
		const rooms = [];
		hotel.hotelRooms.forEach((hotelRoom) => {
			rooms.push({
				area: hotelRoom.area,
				occupancy: hotelRoom.occupancy,
				numBathrooms: hotelRoom.numBathrooms,
				numBedrooms: hotelRoom.numBedrooms,
				price: hotelRoom.price,
				images: hotelRoom.images,
				roomTypeId: hotelRoom.roomType.id,
				beds: hotelRoom.roomsBeds.map((roomBed) => {
					return {
						quantity: roomBed.numBeds,
						bedTypeId: roomBed.bedType.id,
					};
				}),
			});
		});
		hotel.dataValues.rooms = rooms;
		delete hotel.dataValues.hotelRooms;
		return hotel;
	}

	async getAllForHost(hostId, options) {
		if (!hostId) {
			throw new BadRequestError("Id not found");
		}

		const whereCondition = {};
		whereCondition.hostId = hostId;
		whereCondition.idPost = true;
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: [
				"id",
				"name",
				"address",
				"star",
				"description",
				"priceAverage",
			],
		};
		const { count, rows } = await this.getAndCountAll(options);
		return {
			list: rows,
			total: count,
		};
	}

	async getAllForAdmin(options) {
		const whereCondition = {};
		whereCondition.idPost = true;
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: [
				"id",
				"name",
				"address",
				"star",
				"description",
				"priceAverage",
				"createdAt",
			],
			include: [
				{
					model: UserModel,
					as: "host",
					attributes: ["id", "displayName"],
				},
			],
		};
		const { count, rows } = await this.getAndCountAll(options);
		return {
			list: rows,
			total: count,
		};
	}

	async getAllForHostDraft(hostId, options) {
		if (!hostId) {
			throw new BadRequestError("Id not found");
		}

		const whereCondition = {};
		whereCondition.hostId = hostId;
		whereCondition.idPost = false;
		if (options.searchQuery) {
			whereCondition.name = {
				[Op.like]: `%${options.searchQuery}%`,
			};
		}
		options = {
			where: whereCondition,
			limit: options.pageSize,
			offset: (options.page - 1) * options.pageSize,
			attributes: [
				"id",
				"name",
				"address",
				"star",
				"description",
				"priceAverage",
			],
		};
		const { count, rows } = await this.getAndCountAll(options);
		return {
			list: rows,
			total: count,
		};
	}
}

export default new HotelService(HotelModel);
