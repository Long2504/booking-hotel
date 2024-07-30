import { Table, Pagination, Tag, Button, message } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import Box from "../../common/box.core";
import { useEffect, useState } from "react";
import hotelApi from "../../../services/modules/hotel.service";
import { handleError } from "../../../utils/common.utils";
import ButtonCore from "../../common/button.core";

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
						align="center"
						color="processing"
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
			render: (_, record) => (
				<ButtonCore ghost danger>
					Xóa
				</ButtonCore>
			),
		},
	];
	const [listHotel, setListHotel] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [queryParams, setQueryParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();

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
				} = await hotelApi.getListDraftForHost(params);
				setListHotel(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [queryParams, messageApi]);

	const onChangePage = (page) => {
		setQueryParams({
			page: parseInt(page),
			searchQuery: queryParams.get("searchQuery") || "",
		});
	};
	return (
		<Box border={false}>
			{contextHolder}
			<Table
				dataSource={listHotel.map((item, index) => ({
					...item,
					key: index + 1,
				}))}
				columns={columns}
				pagination={false}
			/>
			<Pagination
				style={{ textAlign: "right", marginTop: "20px" }}
				current={queryParams.get("page") || 1}
				total={totalPage}
				onChange={onChangePage}
			/>
		</Box>
	);
}
export default ListHotelUnfinished;
