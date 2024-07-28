//files
import { vietNamDong } from "../../../utils/common.utils";
import { noImage } from "../../../assets/images/index.image";

//libs
import { Space } from "antd";
import dayjs from "dayjs";

//icons
import { FaLocationDot } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";


function BookingHistoryItem({ data }) {
	const hotel = data?.hotelRoom?.hotel;
	const roomInfo = data?.hotelRoom; ;
	const order = data?.order;
	const totalDays = dayjs(data?.checkOutDate).diff(data?.checkInDate, "day");

	return (
		<div className="booking-history__content__list__item">
			<img src={hotel?.images[0] || noImage} alt="" />
			<Space
				direction="vertical"
				className="booking-history__content__list__item__right"
			>
				<h3>{hotel?.name}</h3>
				<Space className="booking-history__content__list__item__right__address">
					<FaLocationDot />
					<span title={hotel?.address}>{hotel?.address}</span>
				</Space>
				<div className="booking-history__content__list__item__right__quantity">
					{data?.numRooms} x {roomInfo?.roomType?.name}
				</div>
				<div className="booking-history__content__list__item__right__price-room">
					<span>
						Giá phòng ({roomInfo?.numRooms} phòng x {totalDays} đêm)
					</span>
					<span>{vietNamDong(roomInfo?.price)}</span>
				</div>
				<div className="booking-history__content__list__item__right__date">
					<span>
						từ{" "}
						{dayjs(data?.checkInDate).format("DD [tháng] M YYYY")} -
						{" đến "}
						{dayjs(data?.checkOutDate).format("DD [tháng] M YYYY")}
					</span>
					<span>{totalDays} đêm</span>
				</div>

				<div className="booking-history__content__list__item__right__booking-on">
					<IoCheckmarkCircleOutline
						style={{ marginRight: 8, width: 20, height: 20 }}
					/>
					<span>
						{dayjs(order?.paymentDate).format(
							"HH:mm:ss [ngày] DD [tháng] MM [năm] YYYY"
						)}
					</span>
				</div>
				<div className="booking-history__content__list__item__right__total-price">
					<span>Tổng tiền</span>
					<span>{vietNamDong(order?.totalPrice)}</span>
				</div>
			</Space>
		</div>
	);
}

export default BookingHistoryItem;
