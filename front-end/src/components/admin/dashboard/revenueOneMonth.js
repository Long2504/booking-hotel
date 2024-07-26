//files
import { handleRevenueOfMonth, vietNamDong } from "../../../utils/common.utils";
import Box from "../../common/box.core";

//libs
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Space } from "antd";

//icons
import { RiseOutlined, FallOutlined } from "@ant-design/icons";



function RevenueOneMonth({ statisticsRevenueOfMonth }) {
	const dataChart = handleRevenueOfMonth(
		statisticsRevenueOfMonth?.totalDataOfMonth
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
		labels:
			dataChart?.map((item, index) => {
				if (index === 0) {
					return dayjs(item.date).format("DD/MM/YYYY");
				}
				if (index === dataChart?.length - 1) {
					return dayjs(item.date).format("DD/MM/YYYY");
				}
				return "";
			}) || [],
		datasets: [
			{
				label: "Total Booking",
				data: dataChart?.map((item) => item.totalPrice) || [],
				backgroundColor: "#1677ff",
				borderColor: "#1677ff",
			},
		],
	};
	const renderIcon = (last, current) => {
		if (last && current) {
			if (current > last) {
				return <RiseOutlined />;
			}
			return <FallOutlined />;
		}
		return null;
	};

	const handlePercent = (last, current) => {
		let result;
		if (last && current) {
			if (current > last) {
				result = ((current - last) / last) * 100;
			} else {
				result = ((last - current) / last) * 100;
			}
			return (result?.toFixed(2) || 0) + " %";
		}
		return "0 %";
	};
	const renderClass = (last, current) => {
		if (current > last) {
			return "percent-rise";
		}
		return "percent-fall";
	};
	return (
		<Box radius={3} className="revenue-detail">
			<div className="revenue-detail__title">
				<h3>Danh thu của 1 tháng gần nhất</h3>
			</div>
			<div className="revenue-detail__content">
				<div className="revenue-detail__content__top">
					<Space
						direction="vertical"
						className="revenue-detail__content__top__item"
					>
						<p className="revenue-detail__content__top__item__title">
							Tháng này
						</p>
						<p>
							{vietNamDong(
								statisticsRevenueOfMonth?.totalPriceInMonth || 0
							)}
						</p>
						<p
							className={
								"revenue-detail__content__top__item__" +
								renderClass(
									statisticsRevenueOfMonth?.totalPriceOfLastMonth,
									statisticsRevenueOfMonth?.totalPriceInMonth
								)
							}
						>
							{renderIcon(
								statisticsRevenueOfMonth?.totalPriceInMonth,
								statisticsRevenueOfMonth?.totalPriceOfLastMonth
							)}
							{handlePercent(
								statisticsRevenueOfMonth?.totalPriceOfLastMonth,
								statisticsRevenueOfMonth?.totalPriceInMonth
							)}
						</p>
					</Space>
					<div className="revenue-detail__content__top__item">
						<p className="revenue-detail__content__top__item__title">
							Tuần này
						</p>
						<p>
							{vietNamDong(
								statisticsRevenueOfMonth?.totalPriceOfWeek || 0
							)}
						</p>
						<p
							className={
								"revenue-detail__content__top__item__" +
								renderClass(
									statisticsRevenueOfMonth?.totalPriceOfLastWeek,
									statisticsRevenueOfMonth?.totalPriceOfWeek
								)
							}
						>
							{renderIcon(
								statisticsRevenueOfMonth?.totalPriceOfWeek,
								statisticsRevenueOfMonth?.totalPriceOfLastWeek
							)}
							{handlePercent(
								statisticsRevenueOfMonth?.totalPriceOfLastWeek,
								statisticsRevenueOfMonth?.totalPriceOfWeek
							)}
						</p>
					</div>
					<div className="revenue-detail__content__top__item">
						<p className="revenue-detail__content__top__item__title">
							Hôm nay
						</p>
						<p>
							{vietNamDong(
								statisticsRevenueOfMonth?.totalPriceToday
							)}
						</p>
						<p
							className={
								"revenue-detail__content__top__item__" +
								renderClass(
									statisticsRevenueOfMonth?.totalPriceYesterday,
									statisticsRevenueOfMonth?.totalPriceToday
								)
							}
						>
							{renderIcon(
								statisticsRevenueOfMonth?.totalPriceToday,
								statisticsRevenueOfMonth?.totalPriceYesterday
							)}
							{handlePercent(
								statisticsRevenueOfMonth?.totalPriceYesterday,
								statisticsRevenueOfMonth?.totalPriceToday
							)}
						</p>
					</div>
				</div>

				<div className="revenue-detail__content__center">
					<Bar data={barChartData} options={barChoptions} />
				</div>
			</div>
		</Box>
	);
}

export default RevenueOneMonth;
