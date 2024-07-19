import * as yup from "yup";

const profileHostFormSchema = yup.object().shape({
	province: yup.string().required("Province is required"),
	district: yup.string().required("District is required"),
	ward: yup.string().required("Ward is required"),
	street: yup.string().required("Street is required"),
	email: yup
		.string()
		.email("Email is not valid")
		.required("Email is required"),
});

export default profileHostFormSchema;
