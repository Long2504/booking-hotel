//files
import Box from "../../components/common/box.core";
import bookingRoomApi from "../../services/modules/bookingRoom.service";
import { expandIconTable } from "../../components/common/expandIcon.core";
import { handleError, vietNamDong } from "../../utils/common.utils";

//libs
import { Empty, Space, Table, DatePicker, Pagination, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

const { RangePicker } = DatePicker;
function RoomManageHostPage() {
	const [listHotelHaveRoomEmpty, setListHotelHaveRoomEmpty] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [queryParams, setQueryParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		(async () => {
			if (
				!queryParams.get("checkInDate") ||
				!queryParams.get("checkOutDate")
			) {
				messageApi.open({
					type: "warning",
					content: "Vui lòng chọn ngày checkIn và ngày checkOut ",
				});
				return;
			}
			const params = {
				page: parseInt(queryParams.get("page") || 1),
				pageSize: 10,
				checkInDate: queryParams.get("checkInDate"),
				checkOutDate: queryParams.get("checkOutDate"),
			};
			try {
				const {
					metaData: { list, total },
				} = await bookingRoomApi.getRoomAvailableHotelsForHost(params);
				setListHotelHaveRoomEmpty(list);
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

	const disabledDate = (current) => {
		return current && current < dayjs().endOf("day");
	};

	const columns = [
		Table.EXPAND_COLUMN,
		{
			title: "STT",
			key: "id",
			width: "5%",
			align: "center",
			render: (_, record, index) => index + 1,
		},
		{
			title: "Tên khách sạn",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Tổng số phòng trống",
			dataIndex: "hotelRooms",
			key: "hotelRooms",
			align: "center",
			render: (data) => {
				return data.reduce((acc, item) => {
					return acc + item?.numBedrooms;
				}, 0);
			},
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Khách sạn được tạo",
			dataIndex: "createdAt",
			key: "createdAt",
		},
	];

	const expandedRowRender = (record) => {
		const columns = [
			{
				title: "STT",
				key: "id",
				dataIndex: "id",
				width: "5%",
				align: "center",
				render: (_, record, index) => index + 1,
			},
			{
				title: "Tên loại phòng",
				dataIndex: "name",
				key: "name",
			},
			{
				title: "Diện tích",
				dataIndex: "area",
				key: "area",
				align: "center",
				render: (data) => `${data} m²`,
			},
			{
				title: "Sức chứa",
				dataIndex: "occupancy",
				key: "occupancy",
			},
			{
				title: "Số lượng phòng còn lại",
				dataIndex: "numBedrooms",
				key: "numBedrooms",
				align: "center",
			},
			{
				title: "Giá phòng",
				dataIndex: "price",
				key: "price",
				align: "center",
				render: (data) => vietNamDong(data),
			},
			{
				title: "Phòng tắm",
				dataIndex: "numBathrooms",
				key: "numBathrooms",
				align: "center",
			},
		];
		return (
			<>
				{record?.hotelRooms?.length > 0 ? (
					<Table
						columns={columns}
						dataSource={record?.hotelRooms}
						pagination={false}
					/>
				) : (
					<Empty />
				)}
			</>
		);
	};

	const onChangeDate = async (val) => {
		if (val === null) {
			return;
		}
		const checkInDate = dayjs(val[0]).format("YYYY-MM-DD");
		const checkOutDate = dayjs(val[1]).format("YYYY-MM-DD");
		try {
			const params = {
				page: 1,
				pageSize: 10,
				checkInDate: checkInDate,
				checkOutDate: checkOutDate,
			};
			setQueryParams(params);
			const {
				metaData: { list, total },
			} = await bookingRoomApi.getRoomAvailableHotelsForHost(params);
			setListHotelHaveRoomEmpty(list);
			setTotalPage(total);
			messageApi.open({
				type: "success",
				content: "Lấy dữ liệu thành công thành công",
			});
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.error(errorMessage);
		}
	};

	const onchangePagination = (page) => {
		const params = {
			page: page || 1,
			pageSize: 10,
			checkInDate: queryParams.get("checkInDate"),
			checkOutDate: queryParams.get("checkOutDate"),
		};
		setQueryParams(params);
	};

	return (
		<Box radius={5} className="room-manager-host" direction="vertical">
			{contextHolder}
			<Space className="room-manager-host__header" direction="horizontal">
				<label>Chọn ngày để xem số lượng phòng còn trống</label>
				<RangePicker
					className="form-manager-room__input__date"
					disabledDate={disabledDate}
					format="dddd, DD/MM/YYYY"
					placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
					onChange={onChangeDate}
				/>
			</Space>
			<Table
				columns={columns}
				dataSource={listHotelHaveRoomEmpty.map((item) => ({
					...item,
					key: item.id,
				}))}
				expandable={{
					expandIcon: expandIconTable,
					expandedRowRender,
				}}
				pagination={false}
			/>
			<Pagination
				style={{ textAlign: "right", marginTop: "20px" }}
				current={queryParams.get("page") || 1}
				total={totalPage}
				onChange={onchangePagination}
			/>
		</Box>
	);
}
export default RoomManageHostPage;
