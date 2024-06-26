//files
import InputCore from "../../components/core/input.core";
import signinFormSchema from "../../validate/signin.validate";

//libs
import { GoogleLogin } from "@react-oauth/google";
import { Divider } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



function SigninPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinFormSchema),
	});
	console.log(errors);
	return (
		<div className='signin-client'>
			<div className='signin-client__content'>
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
					type='password'
				/>

				<button
					className='signin-client__content__submit'
					onClick={handleSubmit((data) => {
						console.log(data);
					})}
				>
					Đăng nhập
				</button>
				<Divider plain>đăng nhập với</Divider>

				<div className='signin-client__content__login-with-gg'>
					<GoogleLogin
						onSuccess={() => {}}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</div>
				<p className='signin-client__content__by-signing'>
					By signing in, I agree to Systems Inc. Terms of Use and
					Privacy Policy.
				</p>
			</div>
		</div>
	);
}

export default SigninPage;
