//files
import InputCore from "../../components/core/input.core";
import signupFormSchema from "../../validate/signup.validate";

//libs
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function SignupPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupFormSchema),
	});

	return (
		<div className='signup-client'>
			<div className='signup-client__content'>
				<h6 style={{ fontSize: 25, fontWeight: 500 }}>Sign up</h6>
				<InputCore
					label={"First name"}
					placeholder={"First name"}
					name='firstName'
					register={register}
					error={errors.firstName}
				/>
				<InputCore
					label={"Last name"}
					placeholder={"Last name"}
					name='lastName'
					register={register}
					error={errors.lastName}
				/>
				<InputCore
					label={"Email"}
					placeholder={"Email"}
					name='email'
					register={register}
					error={errors.email}
				/>
				<InputCore
					label={"Password"}
					placeholder={"Password"}
					name='password'
					register={register}
					error={errors.password}
					type='password'
				/>
				<InputCore
					label={"Confirm Password"}
					placeholder={"Confirm Password"}
					name='confirmPassword'
					register={register}
					error={errors.confirmPassword}
					type='password'
				/>

				<button
					className='signup-client__content__submit'
					onClick={handleSubmit((data) => {
						console.log(data);
					})}
				>
					Sign Up
				</button>
				<div className='signup-client__content__login-with-gg'>
					<GoogleLogin
						onSuccess={() => {}}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</div>
				<div className='signup-client__content__btn-signin'>
					Bạn đã có tài khoản <Link to='/signin'>Đăng nhập</Link>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
