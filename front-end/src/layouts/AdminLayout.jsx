//files
import HeaderAdmin from "../components/admin/common/Header.admin";
import SiderAdmin from "../components/admin/common/Sider.admin";
import { generateRoute } from "../utils/common.utils";
import routesAdmin from "../router/admin.router";
import NotFound from "../pages/common/NotFound";
import LoadingPage from "../pages/common/LoadingPage";

//libs
import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { Routes, useLocation, Route, Navigate } from "react-router-dom";

//icons
import { IoHomeOutline } from "react-icons/io5";

const { Content } = Layout;

function AdminLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const route = useLocation().pathname.split("/");
	return (
		<Layout style={{ minHeight: "100vh" }} hasSider={true}>
			<SiderAdmin collapsed={collapsed} />
			<Layout>
				<HeaderAdmin
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}
				>
					<Breadcrumb
						separator='>'
						items={route.map((item, index) => {
							if (index === 0) {
								return {
									title: <IoHomeOutline />,
								};
							}
							return {
								title: item,
							};
						})}
					/>
					<Routes>
						{generateRoute(routesAdmin, Route)}
						<Route
							path='/'
							element={<Navigate to='/admin/dashboard' />}
						/>
						<Route path={"*"} element={<NotFound />} />
					</Routes>
				</Content>
			</Layout>
			<LoadingPage />
		</Layout>
	);
}

export default AdminLayout;
