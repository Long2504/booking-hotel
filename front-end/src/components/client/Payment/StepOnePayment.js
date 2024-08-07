// files
import TimerPayment from "./TimerPayment";
import InputCore from "../../common/input.core";
import SelectCore from "../../common/select.core";
import Box from "../../common/box.core";
import { districts, provinces, wards } from "../../../utils/dataAddress.utils";
import ButtonCore from "../../common/button.core";

//libs
import { Radio, Space } from "antd";
import { useState } from "react";

//icons
import { LiaSmokingBanSolid, LiaSmokingSolid } from "react-icons/lia";
import { LuBedSingle, LuBedDouble } from "react-icons/lu";
import { CheckOutlined } from "@ant-design/icons";

function StepOnePayment({
	updateStep,
	register,
	errors,
	control,
	handleSubmit,
}) {

	const [codeProvince, setCodeProvince] = useState({
		value: "",
		label: "",
	});
	const [codeDistrict, setCodeDistrict] = useState({
		value: "",
		label: "",
	});

	return (
		<div className="step-one-payment">
			<Box className="step-one-payment__advice">
				<span className="step-one-payment__advice__green-bar"></span>
				<CheckOutlined style={{ color: "green" }} />
				<span className="step-one-payment__advice__great">
					Lựa chọn chỗ nghỉ tuyệt vời
				</span>
				<span> - với số điểm trung bình của khách lên tới </span>
				<span className="step-one-payment__advice__great">5</span>
				<span> từ các bài đánh giá</span>
			</Box>

			<div className="step-one-payment__form">
				<Box className="step-one-payment__form__time">
					<TimerPayment />
				</Box>
				<Box className="step-one-payment__form__info-user step-one-payment__form__box">
					<Space className="step-one-payment__form__info-user__title">
						<CheckOutlined className="step-one-payment__form__info-user__title__icon" />
						<h4>Thông tin liên lạc</h4>
					</Space>
					<InputCore
						label={"Họ và tên đầy đủ"}
						placeholder={"Nhập họ và tên đầy đủ"}
						name={"displayName"}
						register={register}
						error={errors?.displayName}
					/>
					<InputCore
						label={"Email"}
						placeholder={"Nhập email"}
						name={"email"}
						register={register}
						error={errors?.email}
					/>
					<InputCore
						label={"Số điện thoại"}
						placeholder={"Nhập số điện thoại"}
						name={"phone"}
						register={register}
					/>
					<div className="step-one-payment__form__info-user__input-address">
						<SelectCore
							data={provinces}
							name={"province"}
							label={"Thành phố/Tỉnh"}
							width={"46%"}
							placeholder={"Chọn tỉnh/thành phố"}
							control={control}
							error={errors?.province}
							setValue={setCodeProvince}
						/>
						<SelectCore
							data={districts[codeProvince.value]}
							name={"district"}
							label={"Quận/huyện"}
							placeholder={"Chọn quận/huyện"}
							width={"46%"}
							control={control}
							error={errors?.district}
							setValue={setCodeDistrict}
						/>
					</div>
					<div className="step-one-payment__form__info-user__input-address">
						<SelectCore
							data={wards[codeDistrict.value]}
							name={"ward"}
							label={"Xã/phường"}
							placeholder={"Chọn xã/phường"}
							width={"46%"}
							control={control}
							error={errors?.ward}
						/>
						<InputCore
							label={"Số nhà"}
							placeholder={"Nhập số nhà"}
							width={"46%"}
							name={"street"}
							register={register}
							error={errors?.street}
						/>
					</div>
				</Box>
				<Box className="step-one-payment__form__preference step-one-payment__form__box">
					<div className="step-one-payment__form__preference__title">
						<h4>Hãy cho chúng tôi biết quý khách cần gì</h4>
						<label>
							Các yêu cầu còn lệ thuộc vào khả năng cung cấp.
							Chúng tôi sẽ gửi các yêu cầu của quý khách ngay sau
							khi quý khách đặt phòng.
						</label>
					</div>
					<div className="step-one-payment__form__preference__question">
						<div className="step-one-payment__form__preference__question__item">
							<label className="step-one-payment__form__preference__question__item__title">
								Quy định hút thuốc (nếu có phòng):
							</label>

							<Radio.Group>
								<Radio value={1}>
									<Space>
										<LiaSmokingBanSolid
											style={{
												width: "24px",
												height: "24px",
											}}
										/>
										<p>Phòng không hút thuốc</p>
									</Space>
								</Radio>
								<Radio value={2}>
									<Space>
										<LiaSmokingSolid
											style={{
												width: "24px",
												height: "24px",
											}}
										/>
										<p>Phòng hút thuốc</p>
									</Space>
								</Radio>
							</Radio.Group>
						</div>
						<div className="step-one-payment__form__preference__question__item">
							<label className="step-one-payment__form__preference__question__item__title">
								Chọn loại giường (nếu có phòng):
							</label>
							<Radio.Group>
								<Radio value={1}>
									<Space>
										<LuBedSingle
											style={{
												width: "24px",
												height: "24px",
											}}
										/>
										<p>Tôi muốn lấy giường lớn</p>
									</Space>
								</Radio>
								<Radio value={2}>
									<Space>
										<LuBedDouble
											style={{
												width: "24px",
												height: "24px",
											}}
										/>
										<p>Tôi muốn lấy phòng 2 giường</p>
									</Space>
								</Radio>
							</Radio.Group>
						</div>
					</div>
				</Box>

				<Box className="step-one-payment__form__policy step-one-payment__form__box">
					<div className="step-one-payment__form__policy__text">
						<span>
							Thực hiện bước tiếp theo đồng nghĩa với việc bạn
							chấp nhận tuân theo
						</span>
						<span className="step-one-payment__form__policy__text__link">
							Điều khoản sử dụng
						</span>
						<span> và </span>
						<span className="step-one-payment__form__policy__text__link">
							Chính sách bảo mật{" "}
						</span>
						<span>của chúng tôi.</span>
					</div>
					<p>Có liền xác nhận đặt phòng!</p>
					<ButtonCore
						type="primary"
						className="step-one-payment__form__policy__btn"
						onClick={handleSubmit(updateStep)}
					>
						KẾ TIẾP: BƯỚC CUỐI CÙNG
					</ButtonCore>
				</Box>
			</div>
		</div>
	);
}
export default StepOnePayment;
