

function generateRoute(AppRoutes, Route) {
	return AppRoutes.map((r, i) => {
		let element = undefined;
		if (r.element) {
			element = r.element;
		}
		if (r.children) {
			return (
				<Route key={i} {...r} element={element}>
					{generateRoute(r.children, Route)}
				</Route>
			);
		}
		return <Route key={i} {...r} element={element} />;
	});
}

function vietNamDong(money) {
	return Intl.NumberFormat("vi", {
		style: "currency",
		currency: "VND",
	}).format(money);
}

function handleError(error) {
	let errorCode = "UNKNOWN_ERROR";
	let errorMessage = "An unknown error occurred";

	if (error.response) {
		// Server responded with a status other than 200 range
		errorCode = error.response.status;
		errorMessage = error.response.data.message || error.response.statusText;
	} else if (error.request) {
		// Request was made but no response was received
		errorCode = "NO_RESPONSE";
		errorMessage = "No response received from server";
	} else {
		// Something happened in setting up the request that triggered an Error
		errorCode = "REQUEST_SETUP_ERROR";
		errorMessage = error.message;
	}
	return { errorCode, errorMessage };
}

export { generateRoute, vietNamDong, handleError };
