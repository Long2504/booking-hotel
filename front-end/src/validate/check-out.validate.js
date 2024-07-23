import * as yup from "yup";

const profileClientFormSchema = yup.object().shape({
	email: yup
		.string()
		.email("Email is not valid")
        .required("Email is required"),
    displayName: yup.string().required("Display name is required"),
});

export { profileClientFormSchema };
