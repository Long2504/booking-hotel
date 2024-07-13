import { Space, Steps } from "antd";
import React, { useState } from "react";
import DescriptionHotel from "../../components/host/CreateHotel/DescriptionHotel";

import LocationHotel from "../../components/host/CreateHotel/LocationHotel";
import ExtensionHotel from "../../components/host/CreateHotel/ExtensionHotel";
import RoomHotel from "../../components/host/CreateHotel/RoomHotel";
import ImageHotel from "../../components/host/CreateHotel/ImageHotel";
import ProfileHostHotel from "../../components/host/CreateHotel/ProfileHostHotel";
import PostHotelHost from "../../components/host/CreateHotel/PostHotelHost";
import ButtonCore from "../../components/common/button.core";
function CreateHotelHostPage() {
    const [current, setCurrent] = useState(0);
	const listSteps = [
		<DescriptionHotel />,
		<LocationHotel />,
		<ExtensionHotel />,
		<RoomHotel />,
		<ImageHotel />,
		<ProfileHostHotel />,
		<PostHotelHost />,
	];

	return (
		<div className='create-hotel-host'>
			<div className='create-hotel-host__steps'>
				<Steps
					className='create-hotel-host__steps__container'
					progressDot
					current={current}
					direction='vertical'
					items={[
						{
							title: "Thông tin cơ bản",
						},
						{
							title: "Vị trí",
						},
						{
							title: "Tiện nghi",
						},
						{
							title: "Chi tiết phòng ở",
						},
						{
							title: "Ảnh",
						},
						{
							title: "Hồ sơ",
						},
						{
							title: "Đăng",
						},
					]}
				/>
			</div>

			<div className='create-hotel-host__content'>
				<div className='create-hotel-host__content__center'>
					{listSteps[current]}
				</div>
				<div className='create-hotel-host__content__bottom'>
					<div className='create-hotel-host__content__bottom__left'>
						<ButtonCore
							type='text'
							className='create-hotel-host__content__bottom__btn'
							style={{ color: "#1174a6" }}
						>
							LƯU VÀ THOÁT
						</ButtonCore>
					</div>
					<Space className='create-hotel-host__content__bottom__right'>
						{current !== 0 && (
							<ButtonCore
								type='primary'
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
								}}
                                className='create-hotel-host__content__bottom__btn'
                                onClick={() => setCurrent(current - 1)}
							>
								TRƯỚC
							</ButtonCore>
						)}
						{current !== 6 ? (
							<ButtonCore
								type='primary'
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
									color: "#fff",
								}}
                                className='create-hotel-host__content__bottom__btn'
                                onClick={() => setCurrent(current + 1)}
							>
								TIẾP THEO
							</ButtonCore>
						) : (
							<ButtonCore
								type='primary'
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
									color: "#fff",
								}}
								className='create-hotel-host__content__bottom__btn'
							>
								ĐĂNG
							</ButtonCore>
						)}
					</Space>
				</div>
			</div>
		</div>
	);
}

export default CreateHotelHostPage;
