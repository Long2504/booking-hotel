function setUserInfo(user) {
	localStorage.setItem("user", JSON.stringify(user));
}

function getUserInfo() {
	const user = localStorage.getItem("user");
	return user && user !== "undefined" ? JSON.parse(user) : {};
}

function setKeyHeaderHost(key) {
	localStorage.setItem("keyHeaderHost", key);
}

function getKeyHeaderHost() {
	return localStorage.getItem("keyHeaderHost");
}

export { setUserInfo, getUserInfo, setKeyHeaderHost, getKeyHeaderHost };
