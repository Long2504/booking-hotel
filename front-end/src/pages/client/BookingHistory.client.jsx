//files
import BookingHistoryItem from "../../components/client/BookingHistory";
import { getUserInfo } from "../../utils/localStorage.utils";
import ButtonCore from "../../components/common/button.core";
import bookingRoomApi from "../../services/modules/bookingRoom.service";
import { handleError } from "../../utils/common.utils";

//libs
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { message, Pagination } from "antd";

function BookingHistory() {
	const PAGE_SIZE = 5;
	const userInfo = getUserInfo();
	const [listBookingHistory, setListBookingHistory] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [queryParams, setQueryParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();
	useEffect(() => {
		(async () => {
			try {
				const params = {
					page: parseInt(queryParams.get("page")) || 1,
					pageSize: PAGE_SIZE,
					searchQuery: queryParams.get("searchQuery") || "",
				};
				const {
					metaData: { list, total },
				} = await bookingRoomApi.getListForClient(params);
				setListBookingHistory(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [queryParams, messageApi]);

	return (
		<div className="booking-history">
			{contextHolder}
			{listBookingHistory.length === 0 ? (
				<div className="booking-history__nothing">
					<h3>Chào {userInfo.displayName}</h3>
					<h4>Quý khách không có đặt chỗ sắp tới nào</h4>
					<img src="empty.png" alt="" />
					<p>Lên kế hoạch cho chuyến đi tiếp theo!</p>
					<Link to="/">
						<ButtonCore className="booking-history__nothing__btn">
							Chọn chỗ nghỉ
						</ButtonCore>
					</Link>
				</div>
			) : (
				<div className="booking-history__content">
					<h2>Lịch sử đặt phòng</h2>
					<div className="booking-history__content__list">
						{listBookingHistory.map((item) => (
							<BookingHistoryItem key={item.id} data={item} />
						))}
					</div>
					<Pagination
						style={{ textAlign: "right", marginTop: "20px" }}
						current={parseInt(queryParams.get("page")) || 1}
						total={totalPage}
						onChange={(page) => {
							setQueryParams({
								page: parseInt(page),
								pageSize: PAGE_SIZE,
								searchQuery:
									queryParams.get("searchQuery") || "",
							});
						}}
						pageSize={PAGE_SIZE}
					/>
				</div>
			)}
		</div>
	);
}

export default BookingHistory;
