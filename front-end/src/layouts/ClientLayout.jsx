import { Routes, Route } from "react-router-dom";
import { generateRoute } from "../utils/common.utils";
import routesClient from "../router/client.router";
import NotFound from "../pages/core/NotFound";

function ClientLayout() {
    return (
        <div>
            <Routes>
                {generateRoute(routesClient, Route)}
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default ClientLayout;
