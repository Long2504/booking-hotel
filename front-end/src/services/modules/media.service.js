import handleApiCall from "../api/apiCommon.service";
import mediaApiBase from "../api/apiMedia.service";

const mediaEndpoint = {
	uploadImg: "/upload-img",
};

const mediaApi = {
	uploadImg: async (formData) => {
		return await handleApiCall(() =>
			mediaApiBase.post(mediaEndpoint.uploadImg, formData)
		);
	},
};

export default mediaApi;
