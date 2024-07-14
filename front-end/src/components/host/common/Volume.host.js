import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Box from "../../common/box.core";
function VolumeHost({
	register,
	name,
	label,
	width,
	height,
	error,
	min = 1,
	max = 100,
	setValue,
	getValues,
}) {
	const registerInput = register ? register(name) : {};

	const addVolume = () => {
		const currentValue = getValues(name);
		const newValue = Math.min(max, currentValue + 1);
		setValue(name, newValue);
	};

	const minusVolume = () => {
		const currentValue = getValues(name);
		const newValue = Math.max(min, currentValue - 1);
		setValue(name, newValue);
	};
	return (
		<div
			className='volume-host'
			style={{
				width: width || "100%",
				height: height || `${label ? "100px" : "50px"}`,
			}}
		>
			{label && <label>{label}</label>}
			<Box radius={3} className='volume-host__content'>
				<MinusOutlined
					className='volume-host__content__icon'
					onClick={minusVolume}
				/>
				<input
					{...registerInput}
					name={name}
					id={name}
					type='number'
					min={min}
					max={max}
				/>
				<PlusOutlined
					className='volume-host__content__icon'
					onClick={addVolume}
				/>
			</Box>
			<p className='volume-host__error'>{error?.message}</p>
		</div>
	);
}

export default VolumeHost;
