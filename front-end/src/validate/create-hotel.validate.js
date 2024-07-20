import * as yup from "yup";

const descriptionHotelFormSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
	star: yup.number().required("Star is required"),
});

const locationHotelFormSchema = yup.object().shape({
	province: yup.string().required("Province is required"),
	district: yup.string().required("District is required"),
	ward: yup.string().required("Ward is required"),
	street: yup.string().required("Street is required"),
});

const extensionHotelFormSchema = yup.object().shape({
	extension: yup.object().required("Extension is required"),
});

const bedRoomHotelFormSchema = yup.object().shape({
	bedTypeId: yup.string().required("Bed type is required"),
	quantity: yup.number().required("Quantity is required"),
});

const roomHotelFormSchema = yup.object().shape({
	roomTypeId: yup.string().required("Room type is required"),
	area: yup
		.number()
		.required("Area is required")
		.test("is-area-valid", "Area is not valid", (value) => {
			return value > 0;
		}),
	occupancy: yup
		.number()
		.required("Occupancy is required")
		.test("is-occupancy-valid", "Occupancy is not valid", (value) => {
			return value > 0;
		}),
	numBathrooms: yup.number().required("Bathrooms is required"),
	price: yup
		.number()
		.required("Price is required")
		.test("is-price-valid", "Price is not valid", (value) => {
			return value > 0;
		}),
	numBedrooms: yup.number().required("Number is required"),
	images: yup.array().required("Images is required"),
	beds: yup
		.array()
		.of(bedRoomHotelFormSchema)
		.test("is-bed-valid", "Bed is not valid", (value) => {
			return value?.length > 0;
		}),
});

const roomsHotelFormSchema = yup.object().shape({
	rooms: yup
		.array()
		.of(roomHotelFormSchema)
		.test("is-room-valid", "Room is not valid", (value) => {
			return value?.length > 0;
		}),
});

const imgHotelFormSchema = yup.object().shape({
	images: yup.array().test("is-image-valid", "Image is not valid", (value) => {
		return value?.length > 0;
	}),
});

const postHotelFormSchema = yup.object().shape({
});

export {
	descriptionHotelFormSchema,
	locationHotelFormSchema,
	extensionHotelFormSchema,
	roomsHotelFormSchema,
	imgHotelFormSchema,
	postHotelFormSchema,
};
