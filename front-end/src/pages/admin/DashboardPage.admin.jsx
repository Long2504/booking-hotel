//files
import ContainerAdmin from "../../components/admin/common/Container.admin";
import NewHotel from "../../components/admin/dashboard/newHotel";
import Revenue from "../../components/admin/dashboard/revenue";
import RevenueOneMonth from "../../components/admin/dashboard/revenueOneMonth";
import TotalBooking from "../../components/admin/dashboard/totalBooking";
import statisticApi from "../../services/modules/statistic.service";
import { handleError } from "../../utils/common.utils";

//libs
import { useEffect, useState } from "react";
import { message } from "antd";

function DashboardPage() {
	const [dataDashboard, setDataDashboard] = useState({
		statisticsBookingOfInWeek: [],
		statisticsRevenue: [],
		statisticsRevenueOfMonth: [],
		listHotel: [],
	});
	const [messageApi, contextHolder] = message.useMessage();
	useEffect(() => {
		(async () => {
			try {
				const {
					metaData: {
						statisticsBookingOfInWeek,
						statisticsRevenue,
						statisticsRevenueOfMonth,
						listHotel,
					},
				} = await statisticApi.getDashboardForAdmin();
				setDataDashboard({
					statisticsBookingOfInWeek,
					statisticsRevenue,
					statisticsRevenueOfMonth,
					listHotel,
				});
				messageApi.open({
					type: "success",
					content: "Lấy dữ liệu thành công thành công",
				});
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.open({
					type: "error",
					content: errorMessage,
				});
			}
		})();
	}, [messageApi]);

	const styleItem = {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "20px",
	};
	return (
		<ContainerAdmin className="container-admin">
			{contextHolder}
			<div style={styleItem}>
				<TotalBooking
					statisticsBookingOfInWeek={
						dataDashboard.statisticsBookingOfInWeek
					}
				/>
				<Revenue statisticsRevenue={dataDashboard.statisticsRevenue} />
			</div>
			<div style={styleItem}>
				<RevenueOneMonth
					statisticsRevenueOfMonth={
						dataDashboard.statisticsRevenueOfMonth
					}
				/>
				<NewHotel listHotel={dataDashboard.listHotel} />
			</div>
		</ContainerAdmin>
	);
}

export default DashboardPage;
