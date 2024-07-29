//files
import { logoMain } from "../../../assets/images/index.image";
import { getUserInfo } from "../../../utils/localStorage.utils";
import authApi from "../../../redux/action/authAction.redux";
import { handleError } from "../../../utils/common.utils";

//libs
import { Link, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { Avatar, Button, Dropdown, message, Space } from "antd";
import { useDispatch } from "react-redux";

//icons
import { LuUser2 } from "react-icons/lu";
import { FaSortDown } from "react-icons/fa6";


function HeaderClient() {
	const userInfo = getUserInfo();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [messageApi, contextHolder] = message.useMessage();
	const handleLogout = async () => {
		try {
			await dispatch(authApi.signOut()).unwrap();
			messageApi.open({
				type: "success",
				content: "Đăng xuất thành công!",
			})
			navigate("/");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

	const itemsDropdown = [
		{
			key: "1",
			label: "Danh sách đặt phòng",
			onClick: () => {
				navigate("/booking-history");
			},
		},
		{
			key: "2",
			label: "Hồ sơ cá nhân",
			onClick: () => {
				navigate("/");
			},
		},
		{
			key: "3",
			label: "Đăng ký cho thuê khách sạn",
		},
		{
			key: "4",
			label: "Thoát",
			onClick: () => handleLogout(),
		},
	];
	return (
		<Header className="header-client">
			{contextHolder}
			<Link to="/">
				<div className="header-client__left">
					<img
						className="header-client__left__header-logo"
						src={logoMain}
						alt=""
					/>
				</div>
			</Link>
			<div className="header-client__right">
				<Space size={14}>
					<Link to="/host/overview" target="_blank">
						<Button
							className="header-client__right__btn-host"
							size="large"
						>
							Đăng ký cho thuê khách sạn
						</Button>
					</Link>
					{userInfo ? (
						<Space className="header-client__right__user">
							<Avatar
								icon={<LuUser2 />}
								src={userInfo?.avatarUrl}
							/>
							<Dropdown
								menu={{
									items: itemsDropdown,
								}}
								trigger={["click"]}
								overlayStyle={{ top: "70px" }}
								align={"right"}
							>
								<Space direction="horizontal">
									<span>
										{userInfo?.displayName ||
											userInfo?.email}
									</span>
									<FaSortDown size={16} />
								</Space>
							</Dropdown>
						</Space>
					) : (
						<>
							<Link to="/signin">
								<Button
									className="header-client__right__btn-signin"
									size="large"
								>
									Đăng nhập
								</Button>
							</Link>
							<Link to="/signup">
								<Button
									className="header-client__right__btn-signup"
									size="large"
								>
									Tạo tài khoản
								</Button>
							</Link>
						</>
					)}
				</Space>
			</div>
		</Header>
	);
}

export default HeaderClient;
