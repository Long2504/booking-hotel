//files
import FooterClient from "../components/client/core/Footer.client";
import { generateRoute } from "../utils/common.utils";
import routesClient from "../router/client.router";
import NotFound from "../pages/core/NotFound";
import HeaderClient from "../components/client/core/Header.client";

//libs
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

function ClientLayout() {
	const layoutStyle = {
		borderRadius: 8,
		with: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "white",
    };
	return (
		<Layout style={layoutStyle}>
			<HeaderClient />
			<Content>
				<Routes>
					{generateRoute(routesClient, Route)}
					<Route path={"*"} element={<NotFound />} />
				</Routes>
			</Content>
			<FooterClient />
		</Layout>
	);
}

export default ClientLayout;
