function TextAreaCore({
	label,
	placeholder,
	width,
	height,
	register,
	name,
	rows,
}) {
	const registerInput = register ? register(name) : {};
	return (
		<div
			className='text-area-core'
			style={{
				width: width || "100%",
				height: height || "100%",
			}}
		>
			{label && <label>{label}</label>}
			<textarea
				placeholder={placeholder}
				{...registerInput}
				name={name}
				rows={rows}
			/>
		</div>
	);
}

export default TextAreaCore;
