//libs
import { Select } from "antd";

function SelectCore({ data, label, placeholder, width, height, error }) {
	return (
		<div
			className='select-core'
			style={{
				width: width || "100%",
				height: height || "100px",
			}}
		>
			<label>{label}</label>
			<Select
				className='select-core__input'
				showSearch
				placeholder={placeholder}
				optionFilterProp='children'
				options={data}
			/>
			<p className='select-core__error'>{error?.message}</p>
		</div>
	);
}

export default SelectCore;
