import { districts, provinces, wards } from "./dataAddress.utils";

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

function generateAddress(provinceCode, districtCode, wardCode, street) {
	const province = provinces.find(
		(item) => item.value === provinceCode
	).label;
	const district = districts[provinceCode].find(
		(item) => item.value === districtCode
	).label;
	const ward = wards[districtCode].find(
		(item) => item.value === wardCode
	).label;

	return `${street}, ${ward}, ${district}, ${province}`;
}

function decodeAddress(address) {
	if (!address) return {};
	const [street, ward, district, province] = address.split(", ");
	const provinceCode = provinces.find(
		(item) => item.label === province
	).value;
	const districtCode = districts[provinceCode].find(
		(item) => item.label === district
	).value;
	const wardCode = wards[districtCode].find(
		(item) => item.label === ward
	).value;
	return { provinceCode, districtCode, wardCode, street };
}

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.split(",")[1]);
		reader.onerror = (error) => reject(error);
	});
}

function base64ToFile(base64String, fileName, mimeType) {
	const byteCharacters = atob(base64String);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const arrayBuffer = byteArray.buffer;
	const blob = new Blob([arrayBuffer], { type: mimeType });
	const file = new File([blob], fileName, { type: mimeType });

	return file;
}

export {
	generateRoute,
	vietNamDong,
	handleError,
	generateAddress,
	decodeAddress,
	getBase64,
	fileToBase64,
	base64ToFile,
};
