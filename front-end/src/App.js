//files
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

//libs
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import HostLayout from "./layouts/HostLayout";

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "rgb(83, 146, 249)",
					borderRadius: 2,
					// colorBgContainer: "#f6ffed",
				},
			}}
		>
			<div className='Booking-hotel'>
				<Routes>
					<Route path='/*' element={<ClientLayout />} />
					<Route path='/admin/*' element={<AdminLayout />} />
					<Route path='/host/*' element={<HostLayout />} />
				</Routes>
			</div>
		</ConfigProvider>
	);
}

export default App;
