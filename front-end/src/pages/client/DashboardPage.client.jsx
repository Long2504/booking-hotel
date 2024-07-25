//files
import DashboardLeft from "../../components/client/HotelList/DashboardLeft";
import Loading from "../../components/client/common/Loading.client";
import HotelContainer from "../../components/client/HotelList/HotelContainer";
import hotelApi from "../../services/modules/hotel.service";

//libs
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilterHotel } from "../../redux/slice/hotelSlice.redux";

function DashboardPage() {
	const [listHotel, setListHotel] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [queryParams, setQueryParams] = useSearchParams();
	const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
	const { filter } = useSelector((state) => state.hotel);

	let loading = false;

	useEffect(() => {
		(async () => {
			try {
				setQueryParams(filter);
				const params = { ...filter, pageSize: 7 };
				const {
					metaData: { list, total, priceMax, priceMin },
				} = await hotelApi.getList(params);
				setListHotel(list);
				setMinMaxPrice([priceMin, priceMax]);
				setTotalPage(total);
			} catch (error) {}
		})();
	}, [filter, queryParams, setQueryParams]);

	const dispatch = useDispatch();
	const onChangePage = (page) => {
		// setQueryParams({ page: page });
		dispatch(setFilterHotel({ ...filter, page: page }));
	}
	return (
		<div className="dashboard-page">
			<div className="dashboard-page__left">
				<DashboardLeft minMaxPrice={minMaxPrice} />
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
						onChange={onChangePage}
					/>
				</div>
			</div>
		</div>
	);
}
export default DashboardPage;
