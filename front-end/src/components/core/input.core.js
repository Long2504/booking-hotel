function InputCore({
	register,
	type,
	name,
	label,
	placeholder,
	value,
	readOnly,
	error,
	width,
	height,
}) {
	const registerInput = register ? register(name) : {};
	return (
		<div className='input-core' style={{
			width: width || "100%",
			height: height || "100px",
		}}>
			<label>{label}</label>
			<input
				{...registerInput}
				id={name}
				readOnly={readOnly}
				type={type || "text"}
				name={name}
				defaultValue={value || ""}
				placeholder={placeholder}
			/>
			<p className='input-core__error'>{error?.message}</p>
		</div>
	);
}

export default InputCore;
