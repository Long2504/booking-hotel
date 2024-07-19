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
	...props
}) {
	const registerInput = register ? register(name) : {};
	
	return (
		<div
			className='input-core'
			style={{
				width: width || "100%",
				height: height || `${label ? "100px" : "50px"}`,
			}}
		>
			{
				label && <label>{label}</label>
			}
			<input
				{...registerInput}
				{...props}
				id={name}
				readOnly={readOnly}
				type={type || "text"}
				name={name}
				defaultValue={value || ""}
				placeholder={placeholder}
				style={{
					padding: "10px",
				}}
			/>
			<p className='input-core__error'>{error?.message}</p>
		</div>
	);
}

export default InputCore;
