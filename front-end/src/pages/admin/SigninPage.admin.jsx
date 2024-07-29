// files
import Box from "../../components/common/box.core";
import InputCore from "../../components/common/input.core";
import { signinAdminFormSchema } from "../../validate/signin.validate";
import ButtonCore from "../../components/common/button.core";
import authApi from "../../redux/action/authAction.redux";
import { handleError } from "../../utils/common.utils";

//libs
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import { setIsAdmin } from "../../utils/localStorage.utils";

function SigninAdmin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinAdminFormSchema),
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const onSubmit = async (data) => {
		try {
            await dispatch(authApi.signIn(data)).unwrap();
            setIsAdmin(true)
			messageApi.open({
				type: "success",
				content: "Đăng nhập thành công",
			});
			navigate("/admin/dashboard");
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};

	return (
		<div className="signin-admin">
			{contextHolder}
			<Box radius={4} className="signin-admin__bg">
				<div className="signin-admin__bg__title">Đăng nhập</div>
				<InputCore
					label={"Tên đăng nhập"}
					placeholder={"Nhập tên đăng nhập"}
					name={"email"}
					register={register}
					error={errors?.email}
				/>
				<InputCore
					label={"Password"}
					placeholder={"Password"}
					name={"password"}
					register={register}
					error={errors.password}
					type="password"
				/>
				<div className="signin-admin__bg__button">
					<ButtonCore
						onClick={handleSubmit(onSubmit)}
						size={["40%", "40px"]}
					>
						Đăng nhập
					</ButtonCore>
				</div>
			</Box>
		</div>
	);
}

export default SigninAdmin;
