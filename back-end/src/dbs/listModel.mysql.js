import BedsTypeModel from "../models/bedsType.model.js";
import ExtensionModel from "../models/extension.model.js";
import HotelModel from "../models/hotel.model.js";
import HotelExtensionModel from "../models/hotelExtension.model.js";
import HotelRoomModel from "../models/hotelRoom.model.js";
import KeyTokenModel from "../models/keyToken.model.js";
import RoomsBedModel from "../models/roomBed.model.js";
import RoomsTypeModel from "../models/roomType.model.js";
import SubExtensionModel from "../models/subExtension.model.js";
import UserModel from "../models/user.model.js";

const ListModel = [
    UserModel,
    KeyTokenModel,
    BedsTypeModel,
    HotelModel,
    RoomsTypeModel,
    HotelRoomModel,
    RoomsBedModel,
    ExtensionModel,
    SubExtensionModel,
    HotelExtensionModel,
];

export default ListModel;
