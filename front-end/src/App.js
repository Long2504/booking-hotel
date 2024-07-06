import { Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import { ConfigProvider } from "antd";

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
				</Routes>
			</div>
		</ConfigProvider>
	);
}

export default App;
