//files
import StepTwoPayment from "./StepTwoPayment";
import HotelDetailPayment from "./HotelDetailPayment";
import StepOnePayment from "./StepOnePayment";
import { decodeAddress, generateAddress } from "../../../utils/common.utils";
import { profileClientFormSchema } from "../../../validate/check-out.validate";
import { getInfoOrder, setInfoOrder } from "../../../utils/localStorage.utils";

//libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function StepPayment({ step, updateStep }) {
	const userInfo = {};
	const address = decodeAddress(userInfo.address);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(profileClientFormSchema),
		defaultValues: {
			displayName: userInfo.displayName,
			phone: userInfo.phone,
			email: userInfo.email,
			province: address.provinceCode,
			district: address.districtCode,
			ward: address.wardCode,
			street: address.street,
		},
	});
	
	const updateStepPayment = (data) => {
		updateStep(1);
		const address = generateAddress(
			data.province,
			data.district,
			data.ward,
			data.street
		);
		const customerInfo = {
			customerName: data.displayName,
			phone: data.phone,
			email: data.email,
			address: address,
		};
		const dataPayment = getInfoOrder();
		setInfoOrder({ ...dataPayment, customerInfo });
	};
	const stepList = [
		<StepOnePayment
			updateStep={updateStepPayment}
			control={control}
			errors={errors}
			register={register}
			handleSubmit={handleSubmit}
		/>,
		<StepTwoPayment updateStep={updateStep} />,
	];
	return (
		<div className="step-payment">
			<div className="step-payment__content">{stepList[step]}</div>
			<div className="step-payment__right">
				<HotelDetailPayment />
			</div>
		</div>
	);
}

export default StepPayment;
