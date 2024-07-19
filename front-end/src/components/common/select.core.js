//libs
import { Select } from "antd";
import { Controller } from "react-hook-form";

function SelectCore({
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
			className='select-core'
			style={{
				width: width || "100%",
				height: height || "100px",
			}}
		>
			<label>{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						className='select-core__input'
						showSearch
						placeholder={placeholder}
						optionFilterProp='children'
						options={data}
						{...field}
						onChange={(value, option) => {
							field.onChange(value);
							setValue &&
								setValue({
									...option,
								});
						}}
						onBlur={() => field.onBlur()}
						{...props}
					/>
				)}
			/>

			<p className='select-core__error'>{error?.message}</p>
		</div>
	);
}

export default SelectCore;
