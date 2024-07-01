//files
import StepPayment from "../../components/client/Payment/StepPayment";

//libs
import { Steps } from "antd";
import { useState } from "react";
function CheckoutPage() {
    const [step, setStep] = useState(0);
	return (
		<div>
			<div className='checkout-page'>
				<div className='checkout-page__nav'>
					<Steps
						className='checkout-page__nav__steps'
						current={step}
						items={[
							{
								title: "Thông tin tài khoản",
							},
							{
								title: "Chi tiết thanh toán",
							},
							{
								title: "Đã xác nhận đặt phòng",
							},
						]}
					/>
				</div>

				<div className='checkout-page__container'>
					<StepPayment step={step} />
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
