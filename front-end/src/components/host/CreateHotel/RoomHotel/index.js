//files
import RoomHotelDetail from "./RoomHotelDetail";
import Box from "../../../common/box.core";
import ButtonCore from "../../../common/button.core";

//libs
import { Space } from "antd";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

function RoomHotel({ errors, setValue, register, control, getValues }) {
	const roomObj = {
		id: 1,
		roomTypeId: "",
		area: 0,
		occupancy: 1,
		numBathrooms: 0,
		price: 0,
		numBedrooms: 1,
		images: [],
	};
	const { fields, append, remove } = useFieldArray({
		control,
		name: "rooms",
	});

	const handleAddRoom = () => {
		append(roomObj);
	};
	const handleRemoveRoom = (index) => {
		remove(index);
	};

	return (
		<Space direction='vertical' className='room-hotel-host'>
			<div className='room-hotel-host__title'>
				<Space direction='vertical'>
					<h1>Thiết lập phòng</h1>
					<p>
						Liệt kê khách sạn của bạn trên hệ thống chúng tôi bằng
						cách thiết lập giá cả và chi tiết phòng cho ít nhất một
						phòng
					</p>
				</Space>
			</div>
			<Space direction='vertical' className='room-hotel-host__content'>
				<h2>Chi tiết phòng và giá</h2>
				<Box className='room-hotel-host__content__container' radius={5}>
					{fields?.map((_, index) => (
						<RoomHotelDetail
							indexRoom={index}
							key={index}
							register={register}
							control={control}
							errors={errors?.rooms?.[index]}
							setValue={setValue}
							getValues={getValues}
							handleRemoveRoom={handleRemoveRoom}
						/>
					))}
					<ButtonCore
						type='primary'
						size='large'
						className='room-hotel-host__content__container__btn'
						onClick={handleAddRoom}
					>
						Thêm phòng
					</ButtonCore>
				</Box>
			</Space>
		</Space>
	);
}
export default RoomHotel;
