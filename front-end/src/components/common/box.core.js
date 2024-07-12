function Box({ border = true, radius, style, ...props }) {
	const boxStyle = {
		...(border && { border: `1px solid #ccc` }),
		...(radius && { borderRadius: `${radius}px` }),
		...style,
	};
	return (
		<div style={boxStyle} {...props}>
			{props.children}
		</div>
	);
}
export default Box;
