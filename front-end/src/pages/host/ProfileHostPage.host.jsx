import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useForm } from "react-hook-form";
import Box from "../../components/common/box.core";
import ButtonCore from "../../components/common/button.core";
import InputCore from "../../components/common/input.core";
import SelectCore from "../../components/common/select.core";
import TextAreaCore from "../../components/common/textArea.core";

function ProfileHostPage() {
	const { register } = useForm();

	return (
		<div className='profile-host'>
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
						/>
					</Box>
				</Space>
				<Space
					direction='vertical'
					className='profile-host__container__item'
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
								name='phoneNumber'
								register={register}
								width={"46%"}
							/>
							<InputCore
								label='Email'
								placeholder='Nhập email'
								name='email'
								register={register}
								width={"46%"}
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
									data={[]}
									label='Thành phố/Tỉnh'
									width={"46%"}
									register={register}
									placeholder={"Chọn tỉnh/thành phố"}
								/>
								<SelectCore
									data={[]}
									label='Quận/huyện'
									width={"46%"}
									register={register}
									placeholder={"Chọn quận/huyện"}
								/>
							</div>
							<div className='profile-host__container__item__main__inputs'>
								<SelectCore
									data={[]}
									label='Xã/phường'
									width={"46%"}
									register={register}
									placeholder={"Chọn xã/phường"}
								/>
								<InputCore
									label='Số nhà'
									placeholder='Nhập số nhà'
									register={register}
									width={"46%"}
									name='streetNumber'
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
						<ButtonCore>Lưu</ButtonCore>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ProfileHostPage;
