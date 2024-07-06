//libs
import { Select } from "antd";

function SelectCore({ data, label, placeholder, width, height }) {
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
		</div>
	);
}

export default SelectCore;
