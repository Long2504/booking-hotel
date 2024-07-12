//libs
import { Modal } from "antd";

//icons
import { FaExclamationCircle } from "react-icons/fa";

const { confirm } = Modal;
const showConfirmDelete = (onOK) => {
	confirm({
		title: "Bạn có muốn xóa dữ liệu này không",
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		icon: (
			<FaExclamationCircle
				style={{
					color: "#faad14",
					fontSize: "20px",
					marginRight: "5px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			/>
		),
		async onOk() {
			return onOK();
		},
		onCancel() {
			return;
		},
	});
};

export default showConfirmDelete;
