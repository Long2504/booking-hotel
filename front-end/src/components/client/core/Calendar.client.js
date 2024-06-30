import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function Calendar({ setFocus, filter }) {
	const [value, setValue] = useState();

	const onChangeDate = (val) => {
		if (val) {
			setValue(val);
		} else {
			setValue(null);
		}
	};

	const disabledDate = (current) => {
		return current && current < dayjs().endOf("day");
	};

	return (
		<RangePicker
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			style={{ width: "100%", height: "100%" }}
			value={value}
			onCalendarChange={(val) => setValue(val)}
			onChange={onChangeDate}
			disabledDate={disabledDate}
			picker='date'
			format='dddd, DD/MM/YYYY'
			placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
		/>
	);
}
export default Calendar;
