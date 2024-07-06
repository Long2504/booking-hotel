//libs
import { Button } from "antd";

function ButtonCore(props) {
	const { size } = props;
	return (
		<Button
			{...props}
			className={props.className}
			type={props.type}
			onClick={props.onClick}

			style={{
				width: size?.[0] || "",
				height: size?.[1] || "",
			}}
		>
			{props.children}
		</Button>
	);
}

export default ButtonCore;
