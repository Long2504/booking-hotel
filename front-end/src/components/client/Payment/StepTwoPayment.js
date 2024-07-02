//files
import { vietNamDong } from "../../../utils/common.utils";
import TimerPayment from "./TimerPayment";
import { paypalImage } from "../../../assets/images/index.image";
import Box from "../../core/box.core";

//libs
import { Checkbox } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dayjs from "dayjs";

//icons
import { MdOutlineVerifiedUser, MdMarkEmailRead } from "react-icons/md";

function StepTwoPayment() {
	const initialOptions = {
		clientId:
			"AXjTTT4BCP-9RwIOfe80ZbuAGw9b4nLceyTb6sqfAxGmykdTTTlmdrAaFEEdxBfK1rVf2-oOjgpQIBXw",
		currency: "USD",
		intent: "capture",
	};
	const onSuccess = async (data) => {};

	const onError = (err) => {
		console.error("PayPal error:", err);
	};
	return (
		<div className='step-two-payment'>
			<Box className='step-two-payment__timer step-two-payment__box'>
				<TimerPayment />
			</Box>
			<Box className='step-two-payment__content step-two-payment__box'>
				<div className='step-two-payment__content__top'>
					<div className='step-two-payment__content__top__title'>
						<MdOutlineVerifiedUser />
						<p>Thanh toán an toàn</p>
					</div>
					<p className='step-two-payment__content__top__text'>
						Tất cả thông tin thẻ đều được mã hóa hoàn toàn, an toàn
						và được bảo vệ.
					</p>
				</div>

				<div className='step-two-payment__content__center'>
					<div className='step-two-payment__content__center__payment'>
						<div className='step-two-payment__content__center__payment__header'>
							<p>THANH TOÁN ĐIỆN TỬ</p>
							<div className='step-two-payment__content__center__payment__header__img'>
								<img src={paypalImage} alt='' />
							</div>
						</div>
						<div className='step-two-payment__content__center__payment__body'>
							<div className='step-two-payment__content__center__payment__body__top'>
								<p>Hình thức thanh toán</p>
								<Box className='step-two-payment__content__center__payment__body__top__container'>
									<div className='step-two-payment__content__center__payment__header__img'>
										<img src={paypalImage} alt='' />
									</div>
									<p>PayPal</p>
								</Box>
							</div>
							<ul className='step-two-payment__content__center__payment__body__bottom'>
								<li>
									<span>
										Quý khách đã chọn thanh toán bằng{" "}
									</span>
									<span className='step-two-payment__content__center__payment__body__bottom_bold'>
										PayPal.
									</span>
									<span>
										{" "}
										Quý khách sẽ được chuyển đến website{" "}
									</span>
									<span className='step-two-payment__content__center__payment__body__bottom_bold'>
										PayPal
									</span>
									<span> để tiến hành giao dịch này.</span>
								</li>
								<li>
									<span>Tổng số tiền bạn phải trả là: </span>
									<span className='step-two-payment__content__center__payment__body__bottom_bold'>
										{vietNamDong(10000)}
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='step-two-payment__content__center__bottom'>
						<div className='step-two-payment__content__center__bottom__check'>
							<Checkbox />
							<p className='step-two-payment__content__center__bottom__check__text'>
								Tôi đồng ý nhận thông tin cập nhật và chương
								trình khuyến mại về Webbsite và các chi nhánh
								hoặc đối tác kinh doanh của Webbsite thông qua
								nhiều kênh. Có thể ngừng nhận thông tin bất cứ
								lúc nào. Đọc thêm trong Chính sách Quyền riêng
								tư.
							</p>
						</div>
						<div className='step-two-payment__content__center__bottom__text'>
							Thực hiện bước tiếp theo đồng nghĩa với việc bạn
							chấp nhận tuân theo <span>Điều khoản sử dụng </span>{" "}
							và <span>Chính sách bảo mật</span> của chúng tôi.
						</div>
						<div className='step-two-payment__content__center__bottom__btn'>
							<PayPalScriptProvider options={initialOptions}>
								<PayPalButtons
									style={{ layout: "horizontal" }}
									createOrder={(data, actions) => {}}
									onApprove={async (data, actions) => {
										const details =
											await actions.order.capture();
										onSuccess(details, data);
									}}
									onError={onError}
								/>
							</PayPalScriptProvider>
						</div>
						<p className='step-two-payment__content__center__bottom__text-red'>
							Đặt phòng hôm nay và thanh toán vào{" "}
							{dayjs(new Date()).format("DD [tháng] M YYYY")}
						</p>
					</div>
				</div>

				<div className='step-two-payment__content__bottom'>
					<MdMarkEmailRead />
					<p>
						Chúng tôi sẽ gởi xác nhận đặt phòng của bạn đến{" "}
						<span>{"mail"}</span>
					</p>
				</div>
			</Box>
			<div className='step-two-payment__btn'>
				<button onClick={() => {}}>Quay lại Chi tiết đặt phòng</button>
			</div>
		</div>
	);
}

export default StepTwoPayment;
