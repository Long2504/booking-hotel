import { Routes, Route } from "react-router-dom";
import { generateRoute } from "../utils/common.utils";
import routesClient from "../router/client.router";
import NotFound from "../pages/core/NotFound";
import HeaderClient from "../components/client/Header.client";
import { Layout } from "antd";
const { Content, Footer } = Layout;
function ClientLayout() {
    const layoutStyle = {
        borderRadius: 8,
        with: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
            <Footer />
        </Layout>
    );
}

export default ClientLayout;
