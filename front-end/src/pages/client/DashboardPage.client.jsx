//files
import DashboardLeft from "../../components/client/HotelList/DashboardLeft";
import Loading from "../../components/client/core/Loading.client";
import HotelContainer from "../../components/client/HotelList/HotelContainer";
import { dataHotel } from "../../data/listHotel.data";

//libs
import { Pagination } from "antd";
function DashboardPage() {
	const listHotel = dataHotel.list;
	const total = dataHotel.total;
	let loading = false;

	return (
		<div className='dashboard-page'>
			<div className='dashboard-page__left'>
				<DashboardLeft />
			</div>
			<div className='dashboard-page__right'>
				<div className='dashboard-page__right__content'>
					{!loading ? (
						listHotel.map((item) => (
							<HotelContainer data={item} key={item.id} />
						))
					) : (
						<Loading />
					)}
					<Pagination
						style={{ textAlign: "right", marginTop: "20px" }}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}
export default DashboardPage;
