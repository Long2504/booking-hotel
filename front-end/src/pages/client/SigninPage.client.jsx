//files
import InputCore from "../../components/common/input.core";
import { signinClientFormSchema } from "../../validate/signin.validate";
import ButtonCore from "../../components/common/button.core";
import { handleError } from "../../utils/common.utils";
import authApi from "../../redux/action/authAction.redux";

//libs
import { GoogleLogin } from "@react-oauth/google";
import { Divider, message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SigninPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinClientFormSchema),
	});
	const { loading } = useSelector((state) => state.auth);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			await dispatch(authApi.signIn(data)).unwrap();
			navigate("/");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

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
		<div className="signin-client">
			{contextHolder}
			<div className="signin-client__content">
				<h6>Sign in</h6>
				<InputCore
					label={"Email"}
					placeholder={"Email"}
					name={"email"}
					register={register}
					error={errors.email}
				/>
				<InputCore
					label={"Password"}
					placeholder={"Password"}
					name={"password"}
					register={register}
					error={errors.password}
					type="password"
				/>

				<ButtonCore
					className="signin-client__content__submit"
					onClick={handleSubmit(onSubmit)}
					size={["100%", "45px"]}
					type="primary"
					loading={loading}
				>
					Đăng nhập
				</ButtonCore>
				<Divider plain>đăng nhập với</Divider>

				<div className="signin-client__content__login-with-gg">
					<GoogleLogin
						onSuccess={responseGoogle}
						onError={responseGoogleFailure}
					/>
				</div>
				<p className="signin-client__content__by-signing">
					By signing in, I agree to Systems Inc. Terms of Use and
					Privacy Policy.
				</p>
			</div>
		</div>
	);
}

export default SigninPage;
