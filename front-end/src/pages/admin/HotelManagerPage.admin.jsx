//files
import { handleError } from "../../utils/common.utils";
import hotelApi from "../../services/modules/hotel.service";
import ContainerAdmin from "../../components/admin/common/Container.admin";

//libs
import { message, Pagination, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


function HotelManagerPage() {
	const [queryParams, setQueryParams] = useSearchParams();
	const [listHotelAdmin, setListHotelAdmin] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [totalPage, setTotalPage] = useState(0);
	useEffect(() => {
		(async () => {
			try {
				const params = {
					page: parseInt(queryParams.get("page")) || 1,
					pageSize: 10,
					searchQuery: queryParams.get("searchQuery") || "",
				};
				setQueryParams(params);
				const {
					metaData: { list, total },
				} = await hotelApi.getListForAdmin();
				setListHotelAdmin(list);
				setTotalPage(total);
				messageApi.open({
					type: "success",
					content: "Lấy dữ liệu thành công thành công",
				});
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [queryParams, setQueryParams, messageApi]);
	const columns = [
		{
			title: "STT",
			key: "id",
			width: "5%",
			align: "center",
			render: (_, record, index) => index + 1,
		},
		{
			title: "Cơ sở kinh doanh",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
			width: "30%",
		},
		{
			title: "Chủ khách sạn",
			dataIndex: "host",
			key: "host",
			render: (data) => data?.displayName || "Admin",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			align: "center",
			render: (data) => dayjs(data).format("DD/MM/YYYY"),
		},
		{
			title: "Xếp hạng sao",
			dataIndex: "star",
			key: "star",
			align: "center",
		},
		{
			title: "Xem chi tiết",
			key: "action",
			render: (_, record) => (
				<Link
					target="_blank"
					style={{ color: "blue" }}
					// to={`/view-hotel/${record.id}`}
				>
					Xem chi tiết
				</Link>
			),
		},
	];
	return (
		<ContainerAdmin className="container-admin">
			{contextHolder}
			<Space className="container-admin__header" direction="horizontal">
				<Search
					placeholder="Nhập vào tên khách sạn hoặc địa chỉ"
					enterButton
					style={{ width: "300px", marginRight: "10px" }}
					size="large"
					value={queryParams.get("searchQuery") || ""}
					onChange={(e) => {
						setQueryParams({
							searchQuery: e.target.value,
							page: 1,
							pageSize: 10,
						});
					}}
				/>
			</Space>
			<Table
				dataSource={listHotelAdmin}
				columns={columns}
				pagination={false}
			/>
			<Pagination
				style={{ textAlign: "right", marginTop: "20px" }}
				current={parseInt(queryParams.get("page")) || 1}
				total={totalPage}
				onChange={(page) => {
					setQueryParams({
						searchQuery: queryParams.get("searchQuery") || "",
						page: parseInt(page || 1),
						pageSize: 10,
					});
				}}
			/>
		</ContainerAdmin>
	);
}

export default HotelManagerPage;
