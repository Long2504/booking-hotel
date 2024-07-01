import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
function TimerPayment() {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [showSemicolon] = useState(false);

	useEffect(() => {
		setInterval(() => {
			const now = dayjs();
			const then = dayjs("2020-09-26 18:59:12", "YYYY-MM-DD hh:mm:ss");
			const countdown = dayjs(then - now);
			setHours(countdown.format("HH"));
			setMinutes(countdown.format("mm"));
			setSeconds(countdown.format("ss"));
		}, 1000);
	}, []);

	return (
		<div className='timer-payment'>
			<span className='timer-payment__text'>
				Đang giữ giá. Đặt ngay để không vuột mất giá tốt
			</span>
			<ClockCircleOutlined className='timer-payment__icon' />
			<div className='timer-payment__time'>
				{showSemicolon ? <div>:</div> : null}
				<div className='timer-payment__time__item'>{hours}:</div>
				{showSemicolon ? <div>:</div> : null}
				<div className='timer-payment__time__item'>{minutes}:</div>
				{showSemicolon ? <div>:</div> : null}
				<div className='timer-payment__time__item'>{seconds}</div>
			</div>
			<button className='timer-payment__btn'>
				Tôi cần thêm thời gian
			</button>
		</div>
	);
}

export default TimerPayment;
