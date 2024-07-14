//files
import RoomHotelDetail from "./RoomHotelDetail";
import Box from "../../../common/box.core";
import ButtonCore from "../../../common/button.core";

//libs
import { Space } from "antd";

function RoomHotel() {
	const hotel = {
		rooms: [
			{
				id: 1,
				roomType: {
					id: "",
					name: "",
				},
				area: 0,
				occupancy: 1,
				bathrooms: 0,
				price: 0,
				number: 1,
				images: [],
				bed: [
					{
						id: 1,
						bedType: {
							id: "",
							name: "",
						},
						number: 1,
					},
				],
			},
		],
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
					{hotel?.rooms?.map((room, index) => (
						<RoomHotelDetail
							room={room}
							indexRoom={index}
							key={index}
						/>
					))}
					<ButtonCore
						type='primary'
						size='large'
						className='room-hotel-host__content__container__btn'
					>
						Thêm phòng
					</ButtonCore>
				</Box>
			</Space>
		</Space>
	);
}
export default RoomHotel;
