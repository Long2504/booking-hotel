//files
import { logoHost } from "../../../assets/images/index.image";
import ButtonCore from "../../common/button.core";
import {
	getKeyHeaderHost,
	getUserInfo,
	setKeyHeaderHost,
} from "../../../utils/localStorage.utils";

//libs
import { Link, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { Divider, Menu, Avatar, Space, Dropdown } from "antd";

//icons
import { FaSortDown } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { BsBookmarkCheck } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";

function HeaderHost() {
	const userInfo = getUserInfo();
	const items = [
		{
			key: "1",
			label: <Link to='/host/overview'>Tổng quan</Link>,
			icon: <AiOutlineDashboard size={18} />,
		},
		{
			key: "2",
			label: <Link to='/host/listings'>Chỗ ở</Link>,
			icon: <IoHomeOutline size={18} />,
		},
		{
			key: "3",
			label: <Link to='/host/reservation'>Đặt phòng</Link>,
			icon: <GrSchedules size={18} />,
		},
		{
			key: "4",
			label: <Link to='/host/manage-room'>Quản lý phòng</Link>,
			icon: <BsBookmarkCheck size={18} />,
		},
		{
			key: "5",
			label: <Link to='/host/profile'>Hồ sơ</Link>,
			icon: <LuUser2 size={18} />,
		},
	];

	const itemsDropdown = [
		{
			key: "1",
			label: <Link to='/host/listings'>Danh sách chỗ ở</Link>,
		},
		{
			key: "2",
			label: <Link to='/host/listings/create'>Thêm một chỗ ở</Link>,
		},
		{
			key: "3",
			label: <Link to='/host/profile'>Hồ sơ</Link>,
		},
	];

	const onClickItemMenu = (e) => {
		setKeyHeaderHost(e.key);
	};

	const navigate = useNavigate();
	const windowReload = () => {
		setKeyHeaderHost("1");
		navigate("/host/overview");
	}
	return (
		<Header className='header-host'>
			<div
				className='header-host__logo'
				onClick={windowReload}
			>
				<img src={logoHost} alt='' />
			</div>
			<Divider className='header-host__divider' type='vertical' />
			<Menu
				className='header-host__menu'
				mode='horizontal'
				items={items}
				color='white'
				onClick={onClickItemMenu}
				selectedKeys={[getKeyHeaderHost()]}
				defaultOpenKeys={["1"]}
			/>
			<ButtonCore className='header-host__btn'>Thêm một chỗ ở</ButtonCore>
			<Space className='header-host__user'>
				<Avatar
					className='header-host__user__avatar'
					icon={<LuUser2 />}
					src={userInfo?.avatarUrl}
				/>

				<Dropdown
					menu={{
						items: itemsDropdown,
					}}
					trigger={["click"]}
					overlayStyle={{ top: "60px" }}
				>
					<Space>
						<span className='header-host__user__name'>Host</span>
						<FaSortDown style={{ color: "white" }} />
					</Space>
				</Dropdown>
			</Space>
		</Header>
	);
}

export default HeaderHost;
