//files
import Box from "../../components/common/box.core";
import ButtonCore from "../../components/common/button.core";
import InputCore from "../../components/common/input.core";
import SelectCore from "../../components/common/select.core";
import TextAreaCore from "../../components/common/textArea.core";
import { provinces, districts, wards } from "../../utils/dataAddress.utils";
import profileHostFormSchema from "../../validate/profile-host.validate";
import { getUserInfo, setUserInfo } from "../../utils/localStorage.utils";
import {
	decodeAddress,
	generateAddress,
	handleError,
} from "../../utils/common.utils";
import mediaApi from "../../services/modules/media.service";
import userApi from "../../services/modules/auth.service";

//libs
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, message, Space } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ProfileHostPage() {
	const userInfo = getUserInfo();
	const address = decodeAddress(userInfo.address);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(profileHostFormSchema),
		defaultValues: {
			photoUrl: userInfo.photoUrl,
			avatarUrl: userInfo.avatarUrl,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			displayName: userInfo.displayName,
			birthday: userInfo.birthday,
			phone: userInfo.phone,
			email: userInfo.email,
			province: address.provinceCode,
			district: address.districtCode,
			ward: address.wardCode,
			street: address.street,
			description: userInfo.description,
		},
	});
	const [previewImage, setPreviewImage] = useState("");
	const [codeProvince, setCodeProvince] = useState({
		value: "",
		label: "",
	});
	const [codeDistrict, setCodeDistrict] = useState({
		value: "",
		label: "",
	});

	const [messageApi, contextHolder] = message.useMessage();

	const handleSubmitForm = async (data) => {
		try {
			let photoUrl = userInfo.photoUrl;
			if (previewImage) {
				const fileInput = document.getElementById("imageInput");
				const formFile = new FormData();
				formFile.append("image", fileInput.files[0]);
				const response = await mediaApi.uploadImg(formFile);
				photoUrl = response?.data?.metaData?.url;
			}
			const address = generateAddress(
				codeProvince.value || data.province,
				codeDistrict.value || data.district,
				data.ward || data.district,
				data.street
			);

			const newData = {
				...data,
				photoUrl,
				address,
				id: userInfo.id,
			};
			const { metaData } = await userApi.updateProfile(newData);
			setUserInfo(metaData?.data);
			messageApi.open({
				type: "success",
				content: "Cập nhật dữ liệu thành công",
			});
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

	const handleClick = async (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target.result);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};
	useEffect(() => {
		return () => {
			previewImage && URL.revokeObjectURL(previewImage);
		};
	}, [previewImage]);

	return (
		<div className='profile-host'>
			{contextHolder}
			<div className='profile-host__container'>
				<Space
					direction='vertical'
					className='profile-host__container__item'
				>
					<Space direction='vertical'>
						<h2>
							Chọn/Đổi hình đại diện trong hồ sơ (không bắt buộc)
						</h2>
						<p>
							Tạo thiện cảm từ cái nhìn đầu tiên! Chúng tôi sẽ
							thêm hình đại diện vào hồ sơ của bạn và hiển thị cho
							khách hàng hay chủ nhà khác về sau.
						</p>
					</Space>
					<Box
						radius={5}
						className='profile-host__container__item__main'
					>
						<Avatar
							className='profile-host__container__item__main__avatar'
							icon={<UserOutlined />}
							src={previewImage || userInfo.photoUrl}
							crossOrigin='use-credentials'
						/>
						<p>
							Hình ảnh thật sự có tác dụng. Hãy chọn một bức ảnh
							rõ ràng và thân thiện để tăng lượng khách đặt phòng.
						</p>
						<ButtonCore
							size={["310px", "45px"]}
							onClick={() =>
								document
									.querySelector("input[type=file]")
									.click()
							}
						>
							Chọn/Đổi hình đại diện trong hồ sơ
						</ButtonCore>
						<input
							type='file'
							accept='image/*'
							style={{ display: "none" }}
							id='imageInput'
							onChange={handleClick}
						/>
					</Box>
				</Space>
				<Space
					className='profile-host__container__item'
					direction='vertical'
				>
					<h2>Họ tên</h2>
					<Box
						radius={5}
						className='profile-host__container__item__main'
					>
						<div style={{ width: "100%" }}>
							<div className='profile-host__container__item__main__inputs'>
								<InputCore
									label='Tên'
									placeholder='Nhập tên'
									name='firstName'
									register={register}
									width={"46%"}
								/>
								<InputCore
									label='Họ'
									placeholder='Nhập họ'
									name='lastName'
									register={register}
									width={"46%"}
								/>
							</div>
							<div className='profile-host__container__item__main__inputs'>
								<InputCore
									label='Tên hiển thị'
									placeholder='Nhập tên hiển thị'
									name='displayName'
									register={register}
									width={"46%"}
								/>
								<InputCore
									label='Ngày sinh'
									placeholder='Nhập tên hiển thị'
									name='birthday'
									register={register}
									width={"46%"}
									type={"date"}
								/>
							</div>
						</div>
					</Box>
				</Space>
				<Space
					direction='vertical'
					className='profile-host__container__item'
				>
					<h2>Chi tiết liên lạc</h2>
					<Box
						radius={5}
						className='profile-host__container__item__main'
					>
						<div className='profile-host__container__item__main__inputs'>
							<InputCore
								label='Số điện thoại di động'
								placeholder='Nhập số điện thoại di động'
								name='phone'
								register={register}
								width={"46%"}
							/>
							<InputCore
								label='Email'
								placeholder='Nhập email'
								name='email'
								register={register}
								width={"46%"}
								disabled={userInfo.email}
							/>
						</div>
					</Box>
				</Space>
				<Space
					direction='vertical'
					className='profile-host__container__item'
				>
					<h2>Nơi bạn sinh sống</h2>
					<Box
						radius={5}
						className='profile-host__container__item__main'
					>
						<div style={{ width: "100%" }}>
							<div className='profile-host__container__item__main__inputs'>
								<SelectCore
									data={provinces}
									name='province'
									label='Thành phố/Tỉnh'
									width={"46%"}
									placeholder={"Chọn tỉnh/thành phố"}
									control={control}
									setValue={setCodeProvince}
									error={errors?.province}
								/>
								<SelectCore
									data={districts[codeProvince?.value]}
									name='district'
									label='Quận/huyện'
									width={"46%"}
									placeholder={"Chọn quận/huyện"}
									control={control}
									setValue={setCodeDistrict}
									error={errors?.district}
								/>
							</div>
							<div className='profile-host__container__item__main__inputs'>
								<SelectCore
									data={wards[codeDistrict?.value]}
									name='ward'
									label='Xã/phường'
									width={"46%"}
									placeholder={"Chọn xã/phường"}
									control={control}
									error={errors?.ward}
								/>
								<InputCore
									label='Số nhà'
									placeholder='Nhập số nhà'
									register={register}
									width={"46%"}
									name='street'
									error={errors?.street}
								/>
							</div>
						</div>
					</Box>
				</Space>
				<Space
					direction='vertical'
					className='profile-host__container__item'
				>
					<h2>Mô tả về bản thân</h2>
					<Box
						radius={5}
						className='profile-host__container__item__main'
					>
						<TextAreaCore
							name={"description"}
							register={register}
							rows={10}
							placeholder={
								"Ví dụ: \n\t• Thông điệp chào đón khách \n\t• Những sở thích và thú vui riêng của bạn \n\t• Lý do bạn cho thuê nhà"
							}
						/>
					</Box>
				</Space>

				<div className='profile-host__container__item'>
					<div className='profile-host__container__item__btn'>
						<ButtonCore>Huỷ</ButtonCore>
						<ButtonCore onClick={handleSubmit(handleSubmitForm)}>
							Lưu
						</ButtonCore>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ProfileHostPage;
