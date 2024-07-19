//files
import Box from "../../components/common/box.core";
import ButtonCore from "../../components/common/button.core";
import { getUserInfo, setKeyHeaderHost } from "../../utils/localStorage.utils";

//libs
import { Divider, Avatar, Steps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//icons
import { FaCircleCheck } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

function OverviewHostPage() {
	const userInfo = getUserInfo();
	const [currentStep, setCurrentStep] = useState(0);
	useEffect(() => {
		const { email, displayName, photoUrl, phone } = userInfo;
		if (email && displayName && photoUrl && phone) setCurrentStep(1);
	});
	const navigate = useNavigate();

	const handleUpdateProfile = () => {
		setKeyHeaderHost("5");
		navigate("/host/profile");
	};
	return (
		<div className='overview-host'>
			<Box radius={5} className='overview-host__container'>
				<div className='overview-host__container__top'>
					<Avatar
						className='overview-host__container__top__avatar'
						icon={<LuUser2 />}
						src={userInfo?.avatarUrl}
					/>
					<div className='overview-host__container__top__process'>
						<h1>
							Xin chào {userInfo?.displayName}, rất vui khi thấy
							bạn trở lại!
						</h1>
						<div className='overview-host__container__top__process__content'>
							<Steps
								style={{ width: "80%" }}
								labelPlacement='vertical'
								current={currentStep}
								items={[
									{
										title: "Chưa xác minh",
										icon: <LuUser2 />,
										style: { color: "red" },
									},
									{
										title: "Đã xác minh",

										icon: <FaCircleCheck />,
									},
									{
										title: "Chủ nhà hạng đầu",
										icon: <FaStar />,
									},
								]}
							/>
						</div>
					</div>
					<ButtonCore
						className='overview-host__container__top__btn'
						size={["180px", "40px"]}
						onClick={handleUpdateProfile}
					>
						Hiệu chỉnh hồ sơ
					</ButtonCore>
				</div>
				<div className='overview-host__container__content'>
					<h3>
						Để trở thành chủ nhà được xác minh, hãy hoàn tất các
						bước bên dưới:
					</h3>
					<div className='overview-host__container__content__main'>
						<Box
							className={`overview-host__container__content__main__item ${
								userInfo?.displayName ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Tên của quý đối tác</h4>
							<p>Tên, Họ</p>
							<div className='overview-host__container__content__main__item__check'>
								{userInfo?.displayName ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vời</strong>
									</>
								) : (
									<ButtonCore onClick={handleUpdateProfile}>
										Cập nhật họ tên
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.displayName ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.displayName ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								userInfo?.photoUrl ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Ảnh</h4>
							<p>Ảnh đại diện</p>
							<div className='overview-host__container__content__main__item__check'>
								{userInfo?.photoUrl ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vời</strong>
									</>
								) : (
									<ButtonCore onClick={handleUpdateProfile}>
										Tải lên ngay bây giờ
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.photoUrl ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.photoUrl ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								userInfo?.email ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Thư điện tử</h4>
							<p>Xác minh thư điện tử</p>
							<div className='overview-host__container__content__main__item__check'>
								{userInfo?.email ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vời</strong>
									</>
								) : (
									<ButtonCore onClick={handleUpdateProfile}>
										Xác thực ngay bây giờ
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.email ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.email ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								userInfo?.phone ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Số điện thoại</h4>
							<p>Xác minh số điện thoại</p>
							<div className='overview-host__container__content__main__item__check'>
								{userInfo?.phone ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vớii</strong>
									</>
								) : (
									<ButtonCore onClick={handleUpdateProfile}>
										Thêm số điện thoại
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.phone ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										userInfo?.phone ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
					</div>
				</div>
				<p>
					Chúng tôi sẽ kiểm tra tiêu chuẩn Chủ nhà được xác minh hằng
					ngày. Một khi đạt yêu cầu, quý đối tác sẽ trở thành Chủ nhà
					được xác minh.
				</p>
			</Box>
		</div>
	);
}
export default OverviewHostPage;
