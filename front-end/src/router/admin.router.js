import BedManagerPage from "../pages/admin/BedManagerPage.admin";
import BookingPage from "../pages/admin/BookingPage.admin";
import CustomerManagerPage from "../pages/admin/CustomerManagerPage.admin";
import DashboardPage from "../pages/admin/DashboardPage.admin";
import ExtensionManagerPage from "../pages/admin/ExtensionManagerPage.admin";
import HotelManagerPage from "../pages/admin/HotelManagerPage.admin";
import RoomManagerPage from "../pages/admin/RoomManagerPage.admin";

const routesAdmin = [
	{
		path: "/dashboard",
		element: <DashboardPage />,
	},
	{
		path: "/customers",
		element: <CustomerManagerPage />,
	},
	{
		path: "/booking",
		element: <BookingPage />,
	},
	{
		path: "/hotel",
		element: <HotelManagerPage />,
	},
	{
		path: "/setting",
		children: [
			{
				path: "extensions",
				element: <ExtensionManagerPage />,
			},
			{
				path: "beds",
				element: <BedManagerPage />,
			},
			{
				path: "rooms",
				element: <RoomManagerPage />,
			},
		],
	},
];
export default routesAdmin;
