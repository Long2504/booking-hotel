import { HomeOutlined } from "@ant-design/icons";
import { Routes, useLocation, Route } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import routesHost from "../router/host.router";
import { generateRoute } from "../utils/common.utils";
import NotFound from "../pages/common/NotFound";
import HeaderHost from "../components/host/common/Header.host";
const { Content, Footer } = Layout;
function HostLayout() {
	const route = useLocation().pathname.split("/");

	const titleBreadcrumb = {
		host: "Trang chủ cho thuê nhà",
		overview: "Tổng quan",
		listings: "Danh sách khách sạn",
		create: "Tạo khách sạn",
		reservation: "Danh sách phòng đặt",
		"manage-room": "Quản lý phòng",
		profile: "Hồ sơ",
		"manage-account": "Quản lý tài khoản",
	};
	const mapRouteToBreadcrumbItems = (route, titleBreadcrumb) => {
		return route.map((item, index) => {
			if (index === 0) {
				return {
					title: <HomeOutlined />,
				};
			}
			return {
				title: titleBreadcrumb[item],
			};
		});
	};
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderHost />
			<Content
				style={{
					margin: 10,
					padding: 10,
					minHeight: 280,
				}}
			>
				<Breadcrumb
					style={{ margin: "16px 40px" }}
					separator='>'
					items={mapRouteToBreadcrumbItems(route, titleBreadcrumb)}
				/>
				<Routes>
					{generateRoute(routesHost, Route)}
					{/* <Route path={"*"} element={<NotFound />} /> */}
				</Routes>
			</Content>
			<Footer style={{ textAlign: "center" }}>
				Footer {new Date().getFullYear()}
			</Footer>
		</Layout>
	);
}

export default HostLayout;
