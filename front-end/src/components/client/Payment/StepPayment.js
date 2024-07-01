//file
import StepTwoPayment from "./StepTwoPayment";
import HotelDetailPayment from "./HotelDetailPayment";
import StepOnePayment from "./StepOnePayment";

function StepPayment({ step }) {
  return (
    <div className="step-payment">
      <div className="step-payment__content">
        {step === 0 && <StepOnePayment />}
        {step === 1 && <StepTwoPayment />}
      </div>
      <div className="step-payment__right">
        <HotelDetailPayment />
      </div>
    </div>
  );
}

export default StepPayment;
