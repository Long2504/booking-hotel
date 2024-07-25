//files
import VolumeHost from "../common/Volume.host";
import SelectCore from "../../common/select.core";
import bookingRoomApi from "../../../services/modules/bookingRoom.service";
import hotelApi from "../../../services/modules/hotel.service";
import InputCore from "../../common/input.core";

//libs
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const FormBookingRoom = ({
	register,
	errors,
	control,
	setValue,
	getValues,
}) => {
	const [listHotel, setListHotel] = useState([]);
	const [filter, setFilter] = useState({
		checkInDate: dayjs().format("YYYY-MM-DD"),
		checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
	});

	const [listRoomEmptyByHotel, setListRoomEmptyByHotel] = useState([]);
	const [roomSelected, setRoomSelected] = useState({});

	const [step, setStep] = useState(0);

	const onClickHotel = (val) => {
		setFilter({
			...filter,
			hotelId: val,
		});
		setStep(1);
	};

	const onChangeDate = async (val) => {
		if (val === null) return;
		setFilter({
			...filter,
			checkInDate: val[0].format("YYYY-MM-DD"),
			checkOutDate: val[1].format("YYYY-MM-DD"),
		});
		const { metaData } =
			await bookingRoomApi.getRoomsIsAvailableByHotelIdForHost({
				hotelId: filter.hotelId,
				checkInDate: val[0].format("YYYY-MM-DD"),
				checkOutDate: val[1].format("YYYY-MM-DD"),
			});
		setListRoomEmptyByHotel(metaData);
		setValue("checkInDate", val[0].format("YYYY-MM-DD"));
		setValue("checkOutDate", val[1].format("YYYY-MM-DD"));
		setStep(2);
	};

	useEffect(() => {
		(async () => {
			const {
				metaData: { list },
			} = await hotelApi.getListForHost({
				page: 1,
				pageSize: 1000,
			});
			setListHotel(list);
		})();
	}, []);

	const disabledDate = (current) => {
		return current && current < dayjs().endOf("day");
	};

	return (
		<div className="form-booking-room">
			<SelectCore
				data={listHotel.map((item) => ({
					value: item?.id,
					label: item?.name,
				}))}
				name="hotelId"
				label="Chọn khách sạn booking"
				control={control}
				placeholder="Chọn khách sạn"
				onChange={onClickHotel}
			/>
			<div className="form-booking-room__input">
				<label>Chọn ngày booking</label>
				<RangePicker
					className="form-booking-room__input__date"
					disabledDate={disabledDate}
					onChange={onChangeDate}
					picker="date"
					format="dddd, DD/MM/YYYY"
					placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
					disabled={step < 1}
				/>
			</div>
			<SelectCore
				data={listRoomEmptyByHotel.map((item) => ({
					...item,
					value: item?.id,
					label: item?.name,
				}))}
				setValue={setRoomSelected}
				name="roomId"
				label="Chọn phòng booking"
				control={control}
				placeholder="Chọn phòng"
				disabled={step < 2}
				error={errors?.roomId}
			/>
			<VolumeHost
				label={"Chọn số lượng phòng booking"}
				name={"numRooms"}
				register={register}
				min={1}
				max={roomSelected?.numBedrooms}
				getValues={getValues}
				setValue={setValue}
				error={errors?.numRooms}
			/>

			<InputCore
				label={"Email khách hàng"}
				placeholder={"Nhập email"}
				name={"email"}
				register={register}
				error={errors?.email}
			/>

			<InputCore
				label={"Tên khách hàng"}
				placeholder={"Nhập tên khách hàng"}
				name={"customerName"}
				register={register}
				error={errors?.email}
			/>
		</div>
	);
};

export default FormBookingRoom;
