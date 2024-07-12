import Box from "../../common/box.core";

function ContainerAdmin({ className, style, children, ...props }) {
	return (
		<Box
			className={className}
			style={{
				width: "100%",
				marginTop: "20px",
				backgroundColor: "white",
				padding: "15px",
				...style,
			}}
			radius={6}
			{...props}
		>
			{children}
		</Box>
	);
}

export default ContainerAdmin;
