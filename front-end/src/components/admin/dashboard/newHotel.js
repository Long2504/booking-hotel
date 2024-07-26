//files
import Box from "../../common/box.core";

//libs
import { Table } from "antd";
import { Link } from "react-router-dom";


function NewHotel({ listHotel }) {
	const columns = [
		{
			title: "STT",
			dataIndex: "key",
			key: "key",
			render: (_, record, index) => index + 1,
		},
		{
			title: "Cơ sở kinh doanh",
			dataIndex: "name",
			key: "name",
		},
	];

	return (
		<Box radius={3} className="dashboard-new-hotel">
			<div className="dashboard-new-hotel__title">
				<h3>Những khách sạn mới</h3>
				<Link to="/admin/hotel">Xem thêm</Link>
			</div>
			<div>
				<Table
					dataSource={listHotel}
					columns={columns}
					pagination={false}
				/>
			</div>
		</Box>
	);
}
export default NewHotel;
