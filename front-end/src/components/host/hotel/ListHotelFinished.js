import { Table, Pagination } from "antd";
import Box from "../../common/box.core";
function ListHotelFinished() {
	const columns = [
		{
			title: "STT",
			dataIndex: "key",
			key: "key",
			width: "5%",
		},
		{
			title: "Cơ sở kinh doanh",
			dataIndex: "name",
			key: "name",
			width: "15%",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			width: "40%",
		},
		{
			title: "Xếp hạng sao",
			dataIndex: "star",
			key: "star",
			align: "center",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
			width: "20%",
		},
		{
			title: "Giá trung bình",
			dataIndex: "priceAverage",
			key: "priceAverage",
			align: "center",
		},
	];
	const listHotel = [];

	return (
		<Box border={false}>
			<Table
				dataSource={listHotel.map((item, index) => ({
					...item,
					key: index + 1,
				}))}
				columns={columns}
				pagination={false}
			/>
			<Pagination style={{ textAlign: "right", marginTop: "20px" }} />
		</Box>
	);
}
export default ListHotelFinished;
