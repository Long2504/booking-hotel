//libs
import { Rate } from "antd";
import { Controller } from "react-hook-form";

function RateCore({
	control,
	name,
	data,
	label,
	placeholder,
	width,
	height,
	error,
	setValue,
	...props
}) {
	return (
		<div
			style={{
				width: width || "100%",
				height: height || "",
			}}
		>
			<label>{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => <Rate {...props} {...field} />}
			/>

			{error && <p className='select-core__error'>{error?.message}</p>}
		</div>
	);
}

export default RateCore;
