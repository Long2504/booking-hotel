//files
import { logoAdmin } from "../../../assets/images/index.image";

//libs
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { Link } from "react-router-dom";

//icons
import { VscPieChart } from "react-icons/vsc";
import { AiOutlineTeam, AiOutlineCarryOut } from "react-icons/ai";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
function SiderAdmin({ collapsed }) {
	const items = [
		getItem(
			<Link to='/admin/dashboard'>Dashboard</Link>,
			"1",
			<VscPieChart />
		),
		getItem(
			<Link to='/admin/customers'>Khách hàng</Link>,
			"2",
			<AiOutlineTeam />
		),
		getItem(
			<Link to='/admin/booking'>Các lịch đã đặt</Link>,
			"3",
			<AiOutlineCarryOut />
		),
		getItem(
			<Link to='/admin/hotel'>Khách sạn</Link>,
			"4",
			<IoHomeOutline />
		),
		getItem("Cài đặt", "sub2", <IoSettingsOutline />, [
			getItem(<Link to='/admin/setting/extensions'>Tiện ích</Link>, "9"),
			getItem(<Link to='/admin/setting/beds'>Loại Giường</Link>, "11"),
			getItem(<Link to='/admin/setting/rooms'>Loại phòng</Link>, "12"),
		]),
		getItem(
			<div onClick={() => alert("Đăng xuất")}>Đăng xuất</div>,
			"5",
			<CiLogout />
		),
	];
	return (
		<Sider
			className='sider-admin'
			trigger={null}
			collapsible
			collapsed={collapsed}
		>
			<div className='sider-admin__logo'>
				<img src={logoAdmin} alt='logo' />
			</div>
			<Menu mode='inline' defaultSelectedKeys={["1"]} items={items} />
		</Sider>
	);
}

export default SiderAdmin;
