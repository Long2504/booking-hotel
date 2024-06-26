import BaseService from "./base.service.js";
import RoomsBedModel from "../models/roomBed.model.js";

class RoomBedService extends BaseService {}

export default new RoomBedService(RoomsBedModel);
