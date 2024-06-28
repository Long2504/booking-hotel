import * as yup from "yup";

const signupFormSchema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	email: yup
		.string()
		.email("Email is not valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required")
		.test("is-password-valid", "Password is not valid", (value) => {
			return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
				value
			);
		}),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default signupFormSchema;
