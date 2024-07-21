//files
import DashboardLeft from "../../components/client/HotelList/DashboardLeft";
import Loading from "../../components/client/common/Loading.client";
import HotelContainer from "../../components/client/HotelList/HotelContainer";
import hotelApi from "../../services/modules/hotel.service";

//libs
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function DashboardPage() {
	const [listHotel, setListHotel] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [queryParams, setQueryParams] = useSearchParams();
	let loading = false;

	useEffect(() => {
		(async () => {
			try {
				const params = {
					page: parseInt(queryParams.get("page")) || 1,
					pageSize: 10,
					searchQuery: queryParams.get("searchQuery") || "",
				};
				const {
					metaData: { list, total },
				} = await hotelApi.getList(params);
				setListHotel(list);
				setTotalPage(total);
			} catch (error) {}
		})();
	}, []);

	return (
		<div className="dashboard-page">
			<div className="dashboard-page__left">
				<DashboardLeft />
			</div>
			<div className="dashboard-page__right">
				<div className="dashboard-page__right__content">
					{!loading ? (
						listHotel.map((item) => (
							<HotelContainer data={item} key={item.id} />
						))
					) : (
						<Loading />
					)}
					<Pagination
						style={{ textAlign: "right", marginTop: "20px" }}
						total={totalPage}
						current={parseInt(queryParams.get("page")) || 1}
						onChange={(page) => {
							setQueryParams({ page: page });
						}}
					/>
				</div>
			</div>
		</div>
	);
}
export default DashboardPage;
