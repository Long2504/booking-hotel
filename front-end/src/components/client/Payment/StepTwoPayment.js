//files
import { handleError, vietNamDong } from "../../../utils/common.utils";
import TimerPayment from "./TimerPayment";
import { paypalImage } from "../../../assets/images/index.image";
import Box from "../../common/box.core";
import ButtonCore from "../../common/button.core";
import orderApi from "../../../services/modules/order.service";
import {
	getInfoOrder,
	getOrderId,
	setOrderId,
} from "../../../utils/localStorage.utils";

//libs
import { Checkbox } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dayjs from "dayjs";

//icons
import { MdOutlineVerifiedUser, MdMarkEmailRead } from "react-icons/md";

function StepTwoPayment({ updateStep }) {
	const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

	const initialOptions = {
		"client-id": paypalClientId,
	};

	const createOrder = async () => {
		try {
			const { room, checkInDate, checkOutDate, totalDays, customerInfo } =
				getInfoOrder();

			const data = {
				room,
				checkInDate,
				checkOutDate,
				totalDays,
				customerInfo,
			};
			const response = await orderApi.createOrderPaypal(data);
			const {
				metaData: { jsonResponse, orderId },
			} = response;
			setOrderId(orderId);
			return jsonResponse.id;
		} catch (error) {
			const { errorMessage } = handleError(error);
			console.log(errorMessage);
		}
	};
	const onApprovedPaypal = async (data, actions) => {
		try {
			const orderId = data.orderID;
			const order = {
				orderIdSys: getOrderId(),
			};

			const response = await orderApi.captureOrderPaypal(order, orderId);
			const {
				metaData: { jsonResponse },
			} = response;
			const errorDetail = jsonResponse?.details?.[0];

			if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
				return actions.restart();
			} else if (errorDetail) {
				throw new Error(
					`${errorDetail.description} (${jsonResponse.debug_id})`
				);
			} else {
				console.log(
					"🚀 ~ file: StepTwoPayment.js:50 ~ formData:",
					data
				);
				// (3) Successful transaction -> Show confirmation or thank you message
			}
		} catch (error) {
			console.log("🚀 ~ file: StepTwoPayment.js:88 ~ error:", error);
		}
	};

	const onError = (err) => {
		console.error("PayPal error:", err);
	};
	return (
		<div className="step-two-payment">
			<Box className="step-two-payment__timer step-two-payment__box">
				<TimerPayment />
			</Box>
			<Box className="step-two-payment__content step-two-payment__box">
				<div className="step-two-payment__content__top">
					<div className="step-two-payment__content__top__title">
						<MdOutlineVerifiedUser />
						<p>Thanh toán an toàn</p>
					</div>
					<p className="step-two-payment__content__top__text">
						Tất cả thông tin thẻ đều được mã hóa hoàn toàn, an toàn
						và được bảo vệ.
					</p>
				</div>

				<div className="step-two-payment__content__center">
					<div className="step-two-payment__content__center__payment">
						<div className="step-two-payment__content__center__payment__header">
							<p>THANH TOÁN ĐIỆN TỬ</p>
							<div className="step-two-payment__content__center__payment__header__img">
								<img src={paypalImage} alt="" />
							</div>
						</div>
						<div className="step-two-payment__content__center__payment__body">
							<div className="step-two-payment__content__center__payment__body__top">
								<p>Hình thức thanh toán</p>
								<Box className="step-two-payment__content__center__payment__body__top__container">
									<div className="step-two-payment__content__center__payment__header__img">
										<img src={paypalImage} alt="" />
									</div>
									<p>PayPal</p>
								</Box>
							</div>
							<ul className="step-two-payment__content__center__payment__body__bottom">
								<li>
									<span>
										Quý khách đã chọn thanh toán bằng{" "}
									</span>
									<span className="step-two-payment__content__center__payment__body__bottom_bold">
										PayPal.
									</span>
									<span>
										{" "}
										Quý khách sẽ được chuyển đến website{" "}
									</span>
									<span className="step-two-payment__content__center__payment__body__bottom_bold">
										PayPal
									</span>
									<span> để tiến hành giao dịch này.</span>
								</li>
								<li>
									<span>Tổng số tiền bạn phải trả là: </span>
									<span className="step-two-payment__content__center__payment__body__bottom_bold">
										{vietNamDong(10000)}
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="step-two-payment__content__center__bottom">
						<div className="step-two-payment__content__center__bottom__check">
							<Checkbox />
							<p className="step-two-payment__content__center__bottom__check__text">
								Tôi đồng ý nhận thông tin cập nhật và chương
								trình khuyến mại về Webbsite và các chi nhánh
								hoặc đối tác kinh doanh của Webbsite thông qua
								nhiều kênh. Có thể ngừng nhận thông tin bất cứ
								lúc nào. Đọc thêm trong Chính sách Quyền riêng
								tư.
							</p>
						</div>
						<div className="step-two-payment__content__center__bottom__text">
							Thực hiện bước tiếp theo đồng nghĩa với việc bạn
							chấp nhận tuân theo <span>Điều khoản sử dụng </span>{" "}
							và <span>Chính sách bảo mật</span> của chúng tôi.
						</div>
						<div className="step-two-payment__content__center__bottom__btn">
							<PayPalScriptProvider options={initialOptions}>
								<PayPalButtons
									style={{ layout: "horizontal" }}
									createOrder={createOrder}
									onApprove={onApprovedPaypal}
									onError={onError}
								/>
							</PayPalScriptProvider>
						</div>
						<p className="step-two-payment__content__center__bottom__text-red">
							Đặt phòng hôm nay và thanh toán vào{" "}
							{dayjs(new Date()).format("DD [tháng] M YYYY")}
						</p>
					</div>
				</div>

				<div className="step-two-payment__content__bottom">
					<MdMarkEmailRead />
					<p>
						Chúng tôi sẽ gởi xác nhận đặt phòng của bạn đến{" "}
						<span>{"mail"}</span>
					</p>
				</div>
			</Box>
			<ButtonCore
				className="step-two-payment__btn"
				onClick={() => updateStep(0)}
				type="primary"
			>
				Quay lại Chi tiết đặt phòng
			</ButtonCore>
		</div>
	);
}

export default StepTwoPayment;
