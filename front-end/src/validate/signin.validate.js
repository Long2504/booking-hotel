import * as yup from "yup";

const signinClientFormSchema = yup.object().shape({
	email: yup
		.string()
		.email("Email is not valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

const signinAdminFormSchema = yup.object().shape({
	email: yup.string().required("Email is required"),
	password: yup.string().required("Password is required"),
});

export { signinClientFormSchema, signinAdminFormSchema };
