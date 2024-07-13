import CreateHotelHostPage from "../pages/host/CreateHotelHostPage.host";
import ListBookingHostPage from "../pages/host/ListBookingHostPage.host";
import ListHotelHostPage from "../pages/host/ListHotelHostPage.host";
import OverviewHostPage from "../pages/host/OverviewHostPage.host";
import ProfileHostPage from "../pages/host/ProfileHostPage.host";
import RoomManageHostPage from "../pages/host/RoomMangerHostPage.host";

const routesHost = [
	{
		path: "/overview",
		element: <OverviewHostPage />,
	},
	{
		path: "/listings",
		children: [
			{
				path: "",
				element: <ListHotelHostPage />,
			},
			{
				path: "create",
				element: <CreateHotelHostPage />,
			},
		],
	},
	{
		path: "/reservation",
		element: <ListBookingHostPage />,
	},
	{
		path: "/manage-room",
		element: <RoomManageHostPage />,
	},
	{
		path: "/profile",
		element: <ProfileHostPage />,
	},
];

export default routesHost;
