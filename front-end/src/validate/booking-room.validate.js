import * as yup from "yup";

const bookingRoomFormSchema = yup.object().shape({
	roomId: yup.string().required("Room is required"),
	checkInDate: yup.date().required("Check in date is required"),
    checkOutDate: yup.date().required("Check out date is required"),
	numRooms: yup
		.number()
		.required("Number of rooms is required")
		.test("is-num-rooms-valid", "Number of rooms is not valid", (value) => {
			return value > 0;
		}),
});

export { bookingRoomFormSchema };
