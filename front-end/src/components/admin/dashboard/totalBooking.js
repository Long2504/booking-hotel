//files
import { handleBookingOfWeek } from "../../../utils/common.utils";
import Box from "../../common/box.core";

//libs
import { Bar } from "react-chartjs-2";
import { Space } from "antd";

function TotalBooking({ statisticsBookingOfInWeek }) {
	const dataChart = handleBookingOfWeek(
		statisticsBookingOfInWeek?.dataOfWeek
	);
	const barChoptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					offset: false,
				},
			},
			y: {
				grid: {
					offset: false,
				},
			},
		},
	};
	const barChartData = {
		labels: dataChart?.map((item) => item.day) || [],
		datasets: [
			{
				label: "Số lượng đặt phòng",
				data: dataChart?.map((item) => item?.booking) || [],
				backgroundColor: "#1677ff",
				borderColor: "#1677ff",
			},
		],
	};

	return (
		<Box radius={3} className="dashboard-total-booking">
			<Space direction="vertical">
				<h3>Tổng đơn đặt phòng</h3>
				<Space>
					<h2>{statisticsBookingOfInWeek?.totalBooking || 0}</h2>
					<p>Đơn đặt phòng</p>
				</Space>
			</Space>
			<div className="dashboard-total-booking__body">
				<Space
					direction="vertical"
					className="dashboard-total-booking__body__left"
				>
					<Space direction="vertical">
						<h3>Tháng này</h3>
						<p>
							{statisticsBookingOfInWeek?.totalBookingInMonth ||
								0}{" "}
							Đơn đặt phòng
						</p>
					</Space>
					<Space direction="vertical">
						<h3>Tuần này</h3>
						<p>
							{statisticsBookingOfInWeek?.totalOfInWeek || 0} Đơn
							đặt phòng
						</p>
					</Space>
				</Space>
				<div className="dashboard-total-booking__body__right">
					<Bar data={barChartData} options={barChoptions} />
				</div>
			</div>
		</Box>
	);
}

export default TotalBooking;
