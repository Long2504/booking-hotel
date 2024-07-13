//files
import Box from "../../components/common/box.core";
import ButtonCore from "../../components/common/button.core";

//libs
import { Divider, Avatar, Steps } from "antd";
import { useState } from "react";

//icons
import { FaCircleCheck } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

function OverviewHostPage() {
	const user = {
		photoUrl: "",
		displayName: "Hoa Phúc",
		uid: "1",
	};
	const [currentStep, setCurrentStep] = useState(0);
	return (
		<div className='overview-host'>
			<Box radius={5} className='overview-host__container'>
				<div className='overview-host__container__top'>
					<Avatar
						className='overview-host__container__top__avatar'
						icon={<LuUser2 />}
						src={user?.photoUrl}
					/>
					<div className='overview-host__container__top__process'>
						<h1>
							Xin chào {user?.displayName}, rất vui khi thấy bạn
							trở lại!
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
								user?.displayName ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Tên của quý đối tác</h4>
							<p>Tên, Họ</p>
							<div className='overview-host__container__content__main__item__check'>
								{user?.displayName ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vời</strong>
									</>
								) : (
									<ButtonCore>Cập nhật họ tên</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.displayName ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.displayName ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								user?.avatarUrl ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Ảnh</h4>
							<p>Tải ảnh đại diện</p>
							<div className='overview-host__container__content__main__item__check'>
								{user?.avatarUrl ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vớii</strong>
									</>
								) : (
									<ButtonCore>
										Tải lên ngay bây giờ
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.avatarUrl ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.avatarUrl ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								user?.email ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Thư điện tử</h4>
							<p>Xác minh thư điện tử</p>
							<div className='overview-host__container__content__main__item__check'>
								{user?.email ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vời</strong>
									</>
								) : (
									<ButtonCore>
										Xác thực ngay bây giờ
									</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.email ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.email ? "true" : "false"
									}`}
								/>
							</div>
						</Box>
						<Box
							className={`overview-host__container__content__main__item ${
								user?.phoneNumber ? "true" : "false"
							}`}
							radius={5}
						>
							<h4>Số điện thoại</h4>
							<p>Xác minh số điện thoại</p>
							<div className='overview-host__container__content__main__item__check'>
								{user?.phoneNumber ? (
									<>
										<FaCircleCheck />
										<strong>Tuyệt vớii</strong>
									</>
								) : (
									<ButtonCore>Thêm số điện thoại</ButtonCore>
								)}
							</div>
							<div className='overview-host__container__content__main__item__line'>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.phoneNumber ? "true" : "false"
									}`}
								/>
								<Divider
									className={`overview-host__container__content__main__item__line__item ${
										user?.phoneNumber ? "true" : "false"
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
