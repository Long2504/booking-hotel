//files
import ButtonCore from "../../common/button.core";

//libs
import { Header } from "antd/es/layout/layout";
import { Avatar, Space, Dropdown } from "antd";

//icons
import { LuUser2 } from "react-icons/lu";
import { FaSortDown } from "react-icons/fa6";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

function HeaderAdmin({ collapsed, setCollapsed }) {
	const itemsDropdown = [
		{
			key: "1",
			label: "Danh sách chỗ ở",
		},
		{
			key: "2",
			label: "Thêm một chỗ ở",
		},
		{
			key: "3",
			label: "Hồ sơ",
		},
		{
			key: "4",
			label: "Thoát",
		},
	];
	const styleIcon = { color: "white", fontSize: "20px" };
	return (
		<Header className='header-admin'>
			<ButtonCore
				type='text'
				icon={
					collapsed ? (
						<AiOutlineMenuUnfold style={styleIcon} />
					) : (
						<AiOutlineMenuFold style={styleIcon} />
					)
				}
				onClick={() => setCollapsed(!collapsed)}
				className='header-admin__collapsed'
			/>
			<Space className='header-admin__user'>
				<Avatar
					className='header-admin__user__avatar'
					icon={<LuUser2 />}
				/>
				<Dropdown
					menu={{
						items: itemsDropdown,
					}}
					trigger={["click"]}
					overlayStyle={{ top: "60px" }}
				>
					<Space>
						<span className='header-admin__user__name'>Admin</span>
						<FaSortDown style={{ color: "white" }} />
					</Space>
				</Dropdown>
			</Space>
		</Header>
	);
}

export default HeaderAdmin;
