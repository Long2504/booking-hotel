//files
import InputCore from "../../components/common/input.core";
import signupFormSchema from "../../validate/signup.validate";
import { handleError } from "../../utils/common.utils";
import authApi from "../../redux/action/authAction.redux";
import ButtonCore from "../../components/common/button.core";

//libs
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { message } from "antd";

function SignupPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupFormSchema),
	});

	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const responseGoogle = async (response) => {
		try {
			const tokenId = response.credential;
			await dispatch(authApi.signInByGoogle({ tokenId })).unwrap();
			navigate("/");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

	const responseGoogleFailure = (error) => {
		messageApi.open({
			type: "error",
			content: error,
		});
	};
	return (
		<div className="signup-client">
			{contextHolder}
			<div className="signup-client__content">
				<h6 style={{ fontSize: 25, fontWeight: 500 }}>Sign up</h6>
				<InputCore
					label={"First name"}
					placeholder={"First name"}
					name="firstName"
					register={register}
					error={errors.firstName}
				/>
				<InputCore
					label={"Last name"}
					placeholder={"Last name"}
					name="lastName"
					register={register}
					error={errors.lastName}
				/>
				<InputCore
					label={"Email"}
					placeholder={"Email"}
					name="email"
					register={register}
					error={errors.email}
				/>
				<InputCore
					label={"Password"}
					placeholder={"Password"}
					name="password"
					register={register}
					error={errors.password}
					type="password"
				/>
				<InputCore
					label={"Confirm Password"}
					placeholder={"Confirm Password"}
					name="confirmPassword"
					register={register}
					error={errors.confirmPassword}
					type="password"
				/>

				<ButtonCore
					className="signup-client__content__submit"
					onClick={handleSubmit((data) => {
						console.log(data);
					})}
					type="primary"
				>
					Sign Up
				</ButtonCore>
				<div className="signup-client__content__login-with-gg">
					<GoogleLogin
						onSuccess={responseGoogle}
						onError={responseGoogleFailure}
					/>
				</div>
				<ButtonCore
					className="signup-client__content__btn-signin"
					onClick={() => navigate("/signin")}
					type="primary"
					ghost
				>
					Bạn đã có tài khoản? Đăng nhập
				</ButtonCore>
			</div>
		</div>
	);
}

export default SignupPage;
