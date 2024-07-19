// files
import DescriptionHotel from "../../components/host/CreateHotel/DescriptionHotel";
import LocationHotel from "../../components/host/CreateHotel/LocationHotel";
import ExtensionHotel from "../../components/host/CreateHotel/ExtensionHotel";
import RoomHotel from "../../components/host/CreateHotel/RoomHotel";
import ImageHotel from "../../components/host/CreateHotel/ImageHotel";
import PostHotelHost from "../../components/host/CreateHotel/PostHotelHost";
import ButtonCore from "../../components/common/button.core";
import {
	descriptionHotelFormSchema,
	extensionHotelFormSchema,
	imgHotelFormSchema,
	locationHotelFormSchema,
	postHotelFormSchema,
	roomsHotelFormSchema,
} from "../../validate/create-hotel.validate";
import { generateAddress } from "../../utils/common.utils";

//libs
import { message, Space, Steps } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


function CreateHotelHostPage() {
	const [current, setCurrent] = useState(0);
	const schemasForm = [
		descriptionHotelFormSchema,
		locationHotelFormSchema,
		extensionHotelFormSchema,
		roomsHotelFormSchema,
		imgHotelFormSchema,
		postHotelFormSchema,
	];
	const {
		register,
		formState: { errors },
		control,
		trigger,
		setValue,
		getValues,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schemasForm[current]),
		mode: "all",
	});

	const [checkedConfirm, setCheckedConfirm] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const listSteps = [
		<DescriptionHotel
			register={register}
			errors={errors}
			control={control}
		/>,
		<LocationHotel register={register} errors={errors} control={control} />,
		<ExtensionHotel errors={errors} setValue={setValue} />,
		<RoomHotel
			errors={errors}
			setValue={setValue}
			control={control}
			register={register}
			getValues={getValues}
		/>,
		<ImageHotel
			control={control}
			getValues={getValues}
			register={register}
		/>,
		<PostHotelHost setCheckedConfirm={setCheckedConfirm} />,
	];

	const handleNext = () => {
		trigger().then((res) => {
			if (res) {
				setCurrent(current + 1);
			}
		});
		return;
	};
	const handlePrev = () => {
		if (current > 0) {
			setCurrent(current - 1);
		}
		return;
	};

	const handleSaveAndExit = (data) => {
		const address = generateAddress(
			data.province,
			data.district,
			data.ward,
			data.street
		)
		console.log(address);
		console.log(data);
	};

	const handlePost = (data) => {
		if (!checkedConfirm) {
			messageApi.open({
				type: "error",
				content: "Vui lòng xác nhận điều khoản trước khi tiếp tục",
			});
			return;
		}
	};
	return (
		<div className='create-hotel-host'>
			{contextHolder}
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
							onClick={handleSubmit(handleSaveAndExit)}
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
								onClick={handlePrev}
							>
								TRƯỚC
							</ButtonCore>
						)}
						{current !== listSteps.length - 1 ? (
							<ButtonCore
								type='primary'
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
									color: "#fff",
								}}
								className='create-hotel-host__content__bottom__btn'
								onClick={handleNext}
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
								onClick={handleSubmit(handlePost)}
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
