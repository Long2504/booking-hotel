//files
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import HostLayout from "./layouts/HostLayout";

//libs
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);
function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "rgb(83, 146, 249)",
					borderRadius: 2,
				},
			}}
		>
			<div className="Booking-hotel">
				<Routes>
					<Route path="/*" element={<ClientLayout />} />
					<Route path="/admin/*" element={<AdminLayout />} />
					<Route path="/host/*" element={<HostLayout />} />
				</Routes>
			</div>
		</ConfigProvider>
	);
}

export default App;
