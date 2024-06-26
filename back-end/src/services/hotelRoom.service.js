import HotelRoomModel from "../models/hotelRoom.model.js";
import BaseService from "./base.service.js";
import RoomBedService from "./roomBed.service.js";

class HotelRoomService extends BaseService {
    async createBulkRoomForHotel(hotelId, data) {
        const arrPromise = data.map( async(room) => {
            const {
                area,
                numBathrooms,
                numBedrooms,
                price,
                images,
                roomTypeId,
                beds,
            } = room;
            const roomCreate = await this.create({
                area,
                numBathrooms,
                numBedrooms,
                price,
                images,
                roomTypeId,
                hotelId
            });
            const arrBedPromise = beds.map(async (bed) => {
                const { numBeds, bedId } = bed;
                await RoomBedService.create({
                    numBeds,
                    bedId,
                    hotelRoomId: roomCreate.id
                })
            });
            await Promise.all(arrBedPromise);
        });
        await Promise.all(arrPromise);
    }
}

export default new HotelRoomService(HotelRoomModel);
