//libs
import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

function LoadingPage() {
	const { globalLoading } = useSelector((state) => state.globalLoading);
	return (
		globalLoading && (
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					zIndex: 10000,
				}}
			>
				<Spin size='large' />
			</div>
		)
	);
}

export default LoadingPage;
