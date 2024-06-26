import BedsTypeModel from "../models/bedsType.model.js";
import ExtensionModel from "../models/extension.model.js";
import HotelModel from "../models/hotel.model.js";
import HotelExtensionModel from "../models/hotelExtension.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import KeyToken from "../models/keyToken.model.js";
import RoomsBed from "../models/roomBed.model.js";
import RoomsType from "../models/roomType.model.js";
import SubExtensionModel from "../models/subExtension.model.js";
import UserModel from "../models/user.model.js";

const ListModel = [
    UserModel,
    KeyToken,
    BedsTypeModel,
    HotelModel,
    RoomsType,
    HotelRoomModel,
    RoomsBed,
    ExtensionModel,
    SubExtensionModel,
    HotelExtensionModel,
];

export default ListModel;
