function setUserInfo(user) {
	localStorage.setItem("user", JSON.stringify(user));
}

function getUserInfo() {
	const user = localStorage.getItem("user");
	return user && user !== "undefined" ? JSON.parse(user) : null;
}

function removeUserInfo() {
	localStorage.removeItem("user");
}

function setKeyHeaderHost(key) {
	localStorage.setItem("keyHeaderHost", key);
}

function getKeyHeaderHost() {
	return localStorage.getItem("keyHeaderHost");
}

function setInfoOrder(order) {
	localStorage.setItem("infoOrder", JSON.stringify(order));
}

function getInfoOrder() {
	const order = localStorage.getItem("infoOrder");
	return order && order !== "undefined" ? JSON.parse(order) : null;
}

function removeInfoOrder() {
	localStorage.removeItem("infoOrder");
}

function setOrderId(id) {
	localStorage.setItem("orderId", id);
}

function getOrderId() {
	return localStorage.getItem("orderId");
}

function removeOrderId() {
	localStorage.removeItem("orderId");
}

export {
	setUserInfo,
	getUserInfo,
	removeUserInfo,
	setKeyHeaderHost,
	getKeyHeaderHost,
	setInfoOrder,
	getInfoOrder,
	removeInfoOrder,
	setOrderId,
	getOrderId,
	removeOrderId,
};
