//files
import Box from "../../common/box.core";
import InputCore from "../../common/input.core";
import SelectCore from "../../common/select.core";
import TextAreaCore from "../../common/textArea.core";
import ButtonCore from "../../common/button.core";

//libs
import { Avatar, Space } from "antd";
import { useForm } from "react-hook-form";

//icons
import { LuUser2 } from "react-icons/lu";

function ProfileHostHotel() {
	const {
		register,
		handleSubmit,
		formState: {},
	} = useForm();

	return (
		<div className='profile-hotel-host'>
			<div className='profile-hotel-host__container'>
				<Space
					direction='vertical'
					className='profile-hotel-host__container__item'
				>
					<h2>Chọn/Đổi hình đại diện trong hồ sơ (không bắt buộc)</h2>
					<p>
						Tạo thiện cảm từ cái nhìn đầu tiên! Chúng tôi sẽ thêm
						hình đại diện vào hồ sơ của bạn và hiển thị cho khách
						hàng hay chủ nhà khác về sau.
					</p>
					<Box
						radius={5}
						className='profile-hotel-host__container__item__main'
					>
						<Avatar
							className='profile-hotel-host__container__item__main__avatar'
							icon={<LuUser2 />}
							src={""}
						/>
						<p>
							Hình ảnh thật sự có tác dụng. Hãy chọn một bức ảnh
							rõ ràng và thân thiện để tăng lượng khách đặt phòng.
						</p>
						<ButtonCore
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
						/>
					</Box>
				</Space>
				<div className='profile-hotel-host__container__item'>
					<h2>Họ tên</h2>
					<Box
						radius={5}
						className='profile-hotel-host__container__item__main'
					>
						<div style={{ width: "100%" }}>
							<div className='profile-hotel-host__container__item__main__inputs'>
								<InputCore
									width={"46%"}
									label={"Tên"}
									placeholder={"Nhập tên"}
									name={"firstName"}
									register={register}
								/>
								<InputCore
									width={"46%"}
									label={"Họ"}
									placeholder={"Nhập họ"}
									name={"lastName"}
									register={register}
								/>
							</div>
							<div className='profile-hotel-host__container__item__main__inputs'>
								<InputCore
									width={"46%"}
									label={"Tên hiển thị"}
									placeholder={"Nhập tên hiển thị"}
									name={"displayName"}
									register={register}
								/>
								<InputCore
									width={"46%"}
									label={"Ngày sinh"}
									name={"birthday"}
									register={register}
									type={"date"}
								/>
							</div>
						</div>
					</Box>
				</div>
				<div className='profile-hotel-host__container__item'>
					<h2>Chi tiết liên lạc</h2>
					<Box
						radius={5}
						className='profile-hotel-host__container__item__main'
					>
						<div className='profile-hotel-host__container__item__main__inputs'>
							<InputCore
								width={"46%"}
								label={"Số điện thoại di động"}
								placeholder={"Nhập số điện thoại di động"}
								name={"phoneNumber"}
								register={register}
							/>
							<InputCore
								width={"46%"}
								label={"Email"}
								placeholder={"Nhập email"}
								name={"email"}
								register={register}
							/>
						</div>
					</Box>
				</div>
				<div className='profile-hotel-host__container__item'>
					<h2>Nơi bạn sinh sống</h2>
					<Box
						radius={5}
						className='profile-hotel-host__container__item__main'
					>
						<div style={{ width: "100%" }}>
							<div className='profile-hotel-host__container__item__main__inputs'>
								<SelectCore
									data={[]}
									width={"46%"}
									label={"Thành phố/Tỉnh"}
									placeholder={"Chọn tỉnh/thành phố"}
								/>
								<SelectCore
									data={[]}
									width={"46%"}
									label={"Quận/huyện"}
									placeholder={"Chọn quận/huyện"}
								/>
							</div>
							<div className='profile-hotel-host__container__item__main__inputs'>
								<SelectCore
									data={[]}
									width={"46%"}
									label={"Xã/phường"}
									placeholder={"Chọn xã/phường"}
								/>
								<InputCore
									width={"46%"}
									label={"Số nhà"}
									placeholder={"Nhập số nhà"}
								/>
							</div>
						</div>
					</Box>
				</div>
				<div className='profile-hotel-host__container__item'>
					<h2>Mô tả về bản thân</h2>
					<Box
						radius={5}
						className='profile-hotel-host__container__item__main'
					>
						<TextAreaCore
							placeholder={
								"Ví dụ: \n\t• Thông điệp chào đón khách \n\t• Những sở thích và thú vui riêng của bạn \n\t• Lý do bạn cho thuê nhà"
							}
							rows={8}
						/>
					</Box>
				</div>
			</div>
		</div>
	);
}

export default ProfileHostHotel;
