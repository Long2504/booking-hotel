function Box({ border = true,radius, ...props }) {
	const style = {
        border: border && `1px solid #ccc`,
        borderRadius: radius && `${radius}px`,
	};
	return (
		<div style={style} {...props}>
			{props.children}
		</div>
	);
}
export default Box;
