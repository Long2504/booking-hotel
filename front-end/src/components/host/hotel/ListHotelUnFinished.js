import { Table, Pagination, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import Box from "../../common/box.core";

function ListHotelUnfinished() {
	const columns = [
		{
			title: "STT",
			dataIndex: "key",
			key: "key",
		},
		{
			title: "Cơ sở kinh doanh",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Xếp hạng sao",
			dataIndex: "star",
			key: "star",
			align: "center",
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Link to={`/host/listings/create/${record.id}`}>
					<Tag
						style={{
							fontSize: 16,
						}}
					>
						Hoàn thành
					</Tag>
				</Link>
			),
		},
		{
			title: "",
			key: "action-delete",
			render: (_, record) => <Button>Xóa</Button>,
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
export default ListHotelUnfinished;
