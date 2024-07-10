import { setGlobalLoading } from "../../redux/slice/globalLoading.redux";
import { store } from "../../redux/store";

const handleApiCall = async (apiCall) => {
	store.dispatch(setGlobalLoading(true));
	try {
		const data = await apiCall();
		return data;
	} catch (error) {
		throw error;
	} finally {
		store.dispatch(setGlobalLoading(false));
	}
};

export default handleApiCall;
