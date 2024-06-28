function InputCore({
	register,
	type,
	name,
	label,
	placeholder,
	value,
	readOnly,
	error,
}) {
	console.log(error);
	const registerInput = register ? register(name) : {};
	return (
		<div className='input-core'>
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
