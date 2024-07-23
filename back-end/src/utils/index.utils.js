import _ from "lodash";

const getInfoData = ({ fields = [], object = {} }) => {
	return _.pick(object, fields);
};

const typeOf = (object) => {
	return Object.prototype.toString.call(object).slice(8, -1);
};

const vietNamDong = (money = 0) => {
	return Intl.NumberFormat("vi", {
		style: "currency",
		currency: "VND",
	}).format(money);
};

const addHoursToDate = (date, hours) => {
	let newDate = new Date(date);
	newDate.setHours(newDate.getHours() + hours);
	return newDate;
};

export { getInfoData, typeOf, vietNamDong, addHoursToDate };
