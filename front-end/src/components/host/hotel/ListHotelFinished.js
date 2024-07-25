//files
import Box from "../../common/box.core";
import hotelApi from "../../../services/modules/hotel.service";
import { handleError, vietNamDong } from "../../../utils/common.utils";

//libs
import { Table, Pagination, message } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
			render: (priceAverage) => vietNamDong(priceAverage),
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
				} = await hotelApi.getListForHost(params);
				setListHotel(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [queryParams, messageApi]);

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
				onChange={(page) => {
					setQueryParams({
						page: parseInt(page),
						searchQuery: queryParams.get("searchQuery") || "",
					});
				}}
			/>
		</Box>
	);
}
export default ListHotelFinished;
