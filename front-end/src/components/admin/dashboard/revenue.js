//files
import { handleRevenueOfWeek, vietNamDong } from "../../../utils/common.utils";
import Box from "../../common/box.core";

//libs
import { Bar } from "react-chartjs-2";
import { Space } from "antd";

function Revenue({ statisticsRevenue }) {
	const dataChart = handleRevenueOfWeek(statisticsRevenue?.totalDataOfWeek);
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
				label: "Tất cả doanh thu",
				data: dataChart?.map((item) => item.totalPrice) || [],
				backgroundColor: "#1677ff",
				borderColor: "#1677ff",
			},
		],
	};
	return (
		<Box radius={3} className="revenue-admin">
			<Space direction="vertical">
				<h3>Tổng doanh thu</h3>
				<Space>
					<h2>
						{vietNamDong(statisticsRevenue?.totalPriceAll || 0)}
					</h2>
				</Space>
			</Space>
			<div className="revenue-admin__body">
				<Space
					direction="vertical"
					className="revenue-admin__body__left"
				>
					<Space direction="vertical">
						<h3>Tháng này</h3>
						<p>
							{vietNamDong(
								statisticsRevenue?.totalPriceInMonth || 0
							)}
						</p>
					</Space>
					<Space direction="vertical">
						<h3>Tuần này</h3>
						<p>
							{vietNamDong(
								statisticsRevenue?.totalPriceInWeek || 0
							)}
						</p>
					</Space>
				</Space>
				<div className="revenue-admin__body__right">
					<Bar data={barChartData} options={barChoptions} />
				</div>
			</div>
		</Box>
	);
}
export default Revenue;
