function TextAreaCore({
	label,
	placeholder,
	width,
	height,
	register,
	name,
	rows,
	error,
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
			<p className='text-area-core__error'>{error?.message}</p>
		</div>
	);
}

export default TextAreaCore;
