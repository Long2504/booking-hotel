import handleApiCall from "../api/apiCommon.service";
import privateApi from "../api/apiPrivate.service";

const bookingRoomEndpoint = {
	getListForHost: "booking-room/host",
	createForHost: "booking-room/host",
	getRoomsIsAvailableByHotelIdForHost: "booking-room/host/room-available",
	deleteForHost: "booking-room/host",
	getRoomAvailableHotelsForHost: "booking-room/host/room-available-hotels",
};

const bookingRoomApi = {
	getListForHost: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(bookingRoomEndpoint.getListForHost, { params })
		);
	},
	getRoomsIsAvailableByHotelIdForHost: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(
				bookingRoomEndpoint.getRoomsIsAvailableByHotelIdForHost,
				{ params }
			)
		);
	},
	createForHost: async (data) => {
		return await handleApiCall(() =>
			privateApi.post(bookingRoomEndpoint.createForHost, data)
		);
	},
	deleteForHost: async (id) => {
		return await handleApiCall(() =>
			privateApi.delete(`${bookingRoomEndpoint.deleteForHost}/${id}`)
		);
	},
	getRoomAvailableHotelsForHost: async (params) => {
		return await handleApiCall(() =>
			privateApi.get(bookingRoomEndpoint.getRoomAvailableHotelsForHost, {
				params,
			})
		);
	},
};

export default bookingRoomApi;
