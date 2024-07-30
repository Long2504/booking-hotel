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
import {
	base64ToFile,
	decodeAddress,
	generateAddress,
	handleError,
} from "../../utils/common.utils";
import mediaApi from "../../services/modules/media.service";
import hotelApi from "../../services/modules/hotel.service";

//libs
import { message, Space, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

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
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		(async () => {
			if (id) {
				const { metaData } = await hotelApi.getDetailForHostDraft(id);
				setValue("id", metaData.id);
				setValue("name", metaData.name);
				setValue("star", metaData.star);
				setValue("description", metaData.description);
				if (metaData.address) {
					const { provinceCode, districtCode, wardCode, street } =
						decodeAddress(metaData.address);
					setValue("province", provinceCode);
					setValue("district", districtCode);
					setValue("ward", wardCode);
					setValue("street", street);
				}
				setValue("address", metaData.address);
				setValue("images", metaData.images);
				setValue("extension", metaData.extension);
				setValue("rooms", metaData.rooms);
			}
		})();
	}, [id, setValue]);

	const listSteps = [
		<DescriptionHotel
			register={register}
			errors={errors}
			control={control}
		/>,
		<LocationHotel register={register} errors={errors} control={control} />,
		<ExtensionHotel
			errors={errors}
			setValue={setValue}
			getValues={getValues}
		/>,
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
			setValue={setValue}
			register={register}
		/>,
		<PostHotelHost setCheckedConfirm={setCheckedConfirm} />,
	];

	const handleNext = () => {
		trigger().then(async (res) => {
			if (res) {
				setCurrent(current + 1);
				if (current + 1 === 5) {
					await handleSetUrlImg();
				}
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

	const handleSaveAndExit = async () => {
		const data = getValues();
		let address = "";
		if (data.province && data.district && data.ward && data.street) {
			address = generateAddress(
				data.province,
				data.district,
				data.ward,
				data.street
			);
		}
		try {
			await hotelApi.createAndSaveDraft({
				...data,
				address: address,
			});
			navigate("/host/listings");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.error(errorMessage);
		}
	};

	const handleUploadImgs = async (listImages) => {
		const listImageResponse = listImages.map(async (image) => {
			if (image.url) {
				return image.url;
			} else {
				const formData = new FormData();
				const file = base64ToFile(image.base64, image.name, image.type);
				formData.append("image", file);
				const response = await mediaApi.uploadImg(formData);
				return response?.data?.metaData?.url;
			}
		});
		return await Promise.all(listImageResponse);
	};

	const handleSetUrlImg = async () => {
		try {
			await handleUploadImgs(getValues("images")).then((response) => {
				setValue("images", response);
			});
			const imgsRoom = getValues("rooms").map(async (room, index) => {
				await handleUploadImgs(room.images).then((response) => {
					setValue(`rooms.${index}.images`, response);
				});
			});
			await Promise.all(imgsRoom);
			messageApi.open({
				type: "success",
				content: "Upload ảnh thành công",
			});
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

	const handlePost = async (data) => {
		if (!checkedConfirm) {
			messageApi.open({
				type: "error",
				content: "Vui lòng xác nhận điều khoản trước khi tiếp tục",
			});
			return;
		}
		const address = generateAddress(
			data.province,
			data.district,
			data.ward,
			data.street
		);
		const dataPost = {
			address,
			...data,
		};
		try {
			await hotelApi.createAndPost(dataPost);
			messageApi.open({
				type: "success",
				content: "Đăng tin thành công",
			});
			navigate("/host/listings");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};
	return (
		<div className="create-hotel-host">
			{contextHolder}
			<div className="create-hotel-host__steps">
				<Steps
					className="create-hotel-host__steps__container"
					progressDot
					current={current}
					direction="vertical"
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

			<div className="create-hotel-host__content">
				<div className="create-hotel-host__content__center">
					{listSteps[current]}
				</div>
				<div className="create-hotel-host__content__bottom">
					<div className="create-hotel-host__content__bottom__left">
						<ButtonCore
							type="text"
							className="create-hotel-host__content__bottom__btn"
							style={{ color: "#1174a6" }}
							onClick={handleSaveAndExit}
						>
							LƯU VÀ THOÁT
						</ButtonCore>
					</div>
					<Space className="create-hotel-host__content__bottom__right">
						{current !== 0 && (
							<ButtonCore
								type="primary"
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
								}}
								className="create-hotel-host__content__bottom__btn"
								onClick={handlePrev}
							>
								TRƯỚC
							</ButtonCore>
						)}
						{current !== listSteps.length - 1 ? (
							<ButtonCore
								type="primary"
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
									color: "#fff",
								}}
								className="create-hotel-host__content__bottom__btn"
								onClick={handleNext}
							>
								TIẾP THEO
							</ButtonCore>
						) : (
							<ButtonCore
								type="primary"
								style={{
									backgroundColor: "#0c5478",
									borderColor: "#0b4d6e",
									color: "#fff",
								}}
								className="create-hotel-host__content__bottom__btn"
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
