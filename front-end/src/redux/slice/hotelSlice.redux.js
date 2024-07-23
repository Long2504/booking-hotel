//libs
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
	list: [],
	filter: {
		searchQuery: "",
		page: 1,
		limit: 10,
		startDate: dayjs().format("YYYY-MM-DD"),
		endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
		roomNumber: 1,
		peopleNumber: 2,
		minimumPrice: 0,
		maximumPrice: 0,
		location: [],
		multiStar: [],
		multiCity: [],
	},
};

const hotelSlice = createSlice({
	name: "hotel",
	initialState: initialState,
	reducers: {
		setFilterHotel: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
	},
});

export const { setFilterHotel } = hotelSlice.actions;

export default hotelSlice.reducer;
