import LandingPage from "../pages/client/LandingPage.client";
import SigninPage from "../pages/client/SigninPage.client";

const routesClient = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/signin",
        element: <SigninPage />,
    },
];

export default routesClient;
