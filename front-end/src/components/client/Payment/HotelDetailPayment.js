// files
import { dataPayment } from "../../../data/payment.data";
import { vietNamDong } from "../../../utils/common.utils";
import { noImage } from "../../../assets/images/index.image";
import Box from "../../core/box.core";

// libs
import { Rate, Divider, Tooltip } from "antd";
import dayjs from "dayjs";

//icons
import { MdVerifiedUser, MdLocalOffer } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

function HotelDetailPayment() {
	const { hotel, room, checkInDate, checkOutDate } = dataPayment;
	return (
		<div className='hotel-detail-checkout'>
			<Box className='hotel-detail-checkout__info hotel-detail-checkout__box'>
				<div className='hotel-detail-checkout__info__img'>
					<img
						src={
							hotel?.images?.length > 0
								? hotel?.images[0]
								: noImage
						}
						alt=''
					/>
				</div>
				<div className='hotel-detail-checkout__info__content'>
					<div className='hotel-detail-checkout__info__content__name'>
						{hotel?.name}
					</div>
					<Rate
						style={{ fontSize: "16px" }}
						defaultValue={hotel?.star}
						disabled
					/>
					<p className='hotel-detail-checkout__info__content__address'>
						{hotel?.address}
					</p>
					<div className='hotel-detail-checkout__info__content__excellent'>
						<FaLocationDot
							style={{
								marginRight: "5px",
								color: "rgb(83, 146, 249)",
							}}
						/>
						<span>Vị trí thuận tiện</span>
					</div>
				</div>
			</Box>

			<Box className='hotel-detail-checkout__info-room hotel-detail-checkout__box'>
				<div className='hotel-detail-checkout__info-room__date'>
					<span>
						{dayjs(checkInDate).format("DD [tháng] M YYYY")} -{" "}
						{dayjs(checkOutDate).format("DD [tháng] M YYYY")}
					</span>
					<span>{room?.totalDays} đêm</span>
				</div>
				<div className='hotel-detail-checkout__info-room__quantity'>
					{room?.number} x {room?.roomType?.name}
				</div>
				<div className='hotel-detail-checkout__info-room__rating'>
					<div className='hotel-detail-checkout__info-room__rating__box'>
						{hotel?.star}
					</div>
					<div className='hotel-detail-checkout__info-room__rating__rev'>
						<div>Vô cùng sạch sẽ</div>
						<div>Từ 670 bài đánh giá</div>
					</div>
				</div>

				<Divider
					style={{ borderBottom: "1px solid rgb(221, 223, 226)" }}
				/>

				<div className='hotel-detail-checkout__info-room__room'>
					<div className='hotel-detail-checkout__info-room__room__img'>
						<img
							src={
								room?.images?.length > 0
									? room?.images[0]
									: noImage
							}
							alt=''
						/>
					</div>
					<div className='hotel-detail-checkout__info-room__room__content'>
						<div className='hotel-detail-checkout__info-room__room__content__text'>
							<FaUser />
							<span>
								{room?.number} phòng, {room?.peopleNumber} người
								lớn
							</span>
						</div>
						<div className='hotel-detail-checkout__info-room__room__content__text'>
							<PiUsersFill />
							<span>
								Tối đa: {room?.occupancy} người, 1 trẻ em (0-11
								tuổi)
							</span>
						</div>
					</div>
				</div>
				<Divider
					style={{ borderBottom: "1px solid rgb(221, 223, 226)" }}
				/>
				<div className='hotel-detail-checkout__info-room__bottom'>
					<MdVerifiedUser
						style={{ color: "green", fontSize: "30px" }}
					/>
					<span>
						Đặt phòng không có rủi ro! Quý khách có thể hủy bỏ cho
						đến 20 Tháng 4,2024 và không phải trả gì!
					</span>
				</div>
			</Box>

			<Box className='hotel-detail-checkout__advice hotel-detail-checkout__box'>
				<MdLocalOffer style={{ color: "green", fontSize: "30px" }} />
				<div className='hotel-detail-checkout__advice__text'>
					<span className='hotel-detail-checkout__advice__text__title'>
						Tuyệt quá Thanh à!{" "}
					</span>
					<span>
						Quý khách đang nhận được mức giá rẻ nhất của chỗ nghỉ!
					</span>
				</div>
			</Box>

			<Box className='hotel-detail-checkout__price hotel-detail-checkout__box'>
				<div className='hotel-detail-checkout__price__top'>
					<div className='hotel-detail-checkout__price__top__item'>
						<span>
							Giá phòng ({room?.number} phòng x {room?.totalDays}{" "}
							đêm)
						</span>
						<span>{vietNamDong(room?.price)}</span>
					</div>
					<div className='hotel-detail-checkout__price__top__item'>
						<span>Phí đặt trước</span>
						<span
							style={{
								color: "rgb(72,139,248)",
								fontWeight: 500,
							}}
						>
							MIỄN PHÍ
						</span>
					</div>
				</div>
				<div className='hotel-detail-checkout__price__bottom'>
					<div className='hotel-detail-checkout__price__bottom__price'>
						<div className='hotel-detail-checkout__price__bottom__price__text'>
							<span className='hotel-detail-checkout__price__bottom__price__text__title'>
								Giá tiền
							</span>
							<Tooltip
								title={
									<div style={{ color: "black" }}>
										<h3>Thuế và phí dịch vụ khách sạn</h3>
										<p>
											Thuế và phí dịch vụ nói chung là chi
											phí thu hồi mà chúng tôi trả lại cho
											nhà cung cấp hoặc sẽ được nhà cung
											cấp thu lại. Thuế và phí dịch vụ
											cũng bao gồm chi phí do chúng tôi
											giữ lại để xử lý đặt phòng
										</p>
									</div>
								}
								color='#fff'
								overlayInnerStyle={{
									width: "400px",
									padding: "10px",
								}}
							>
								<IoMdInformationCircleOutline
									style={{
										cursor: "pointer",
										color: "rgb(72,139,248)",
										fontSize: "25px",
										marginLeft: "5px",
									}}
								/>
							</Tooltip>
						</div>
						<span className='hotel-detail-checkout__price__bottom__price__number'>
							{vietNamDong(
								room?.price *
									room?.totalDays *
									room?.number *
									1.1
							)}
						</span>
					</div>
					<div className='hotel-detail-checkout__price__bottom__advice'>
						<span>Giá đã bao gồm: </span>
						<span>Thuế 8%, Phí dịch vụ 5%</span>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default HotelDetailPayment;
