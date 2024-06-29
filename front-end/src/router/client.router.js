import DashboardPage from "../pages/client/DashboardPage.client";
import LandingPage from "../pages/client/LandingPage.client";
import SigninPage from "../pages/client/SigninPage.client";
import SignupPage from "../pages/client/SignupPage.client";

const routesClient = [
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/hotels",
		element: <DashboardPage />,
	},
	{
		path: "/signin",
		element: <SigninPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
];

export default routesClient;
