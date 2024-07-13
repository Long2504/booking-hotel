import { Empty, Space, Table, DatePicker, Pagination } from "antd";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import Box from "../../components/common/box.core";

const { RangePicker } = DatePicker;
function RoomManageHostPage() {
	const listHotelHaveRoomEmpty = [];
	const [dates, setDates] = useState([]);
	const [hackValue, setHackValue] = useState();
	const [value, setValue] = useState([]);

	const onChangeDate = (val) => {
		if (val) {
			setValue(val);
		} else {
			setValue("");
		}
	};

	const onCalendarChangeCustom = (val) => {
		setDates(val);
	};

	const disabledDate = (current) => {
		if (!dates || dates.length === 0) {
			return false;
		}
		const tooLate = dates[0] && current.diff(dates[0], "days") > 29;
		const tooEarly = dates[1] && dates[1].diff(current, "days") > 29;
		return tooEarly || tooLate;
	};

	const onOpenChange = (open) => {
		if (open) {
			setHackValue([]);
			setDates([]);
		} else {
			setHackValue(undefined);
		}
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
			dataIndex: "rooms",
			key: "rooms",
			align: "center",
			render: (data) => {
				return data.reduce((acc, item) => {
					return acc + item?.number;
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
	const expandIcon = ({ expanded, record, onExpand }) => {
		return (
			<span
				onClick={(e) => {
					onExpand(record, e);
					e.stopPropagation();
				}}
			>
				<RightOutlined
					className='expand-icon'
					style={{
						transform: expanded ? "rotate(90deg)" : "",
					}}
				/>
			</span>
		);
	};

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
				dataIndex: "roomType",
				key: "name",
				render: (data) => data?.name,
			},
			{
				title: "Diện tích",
				dataIndex: "area",
				key: "area",
				align: "center",
				render: (data) => `${data} m²`,
			},
			{
				title: "Giường",
				dataIndex: "beds",
				key: "beds",
				render: (data) => {
					return data?.map((item) => item?.bedType?.name).join(", ");
				},
			},
			{
				title: "Số lượng phòng còn lại",
				dataIndex: "number",
				key: "number",
				align: "center",
			},
			{
				title: "Giá phòng",
				dataIndex: "price",
				key: "price",
				align: "center",
			},
			{
				title: "Phòng tắm",
				dataIndex: "bathrooms",
				key: "bathrooms",
				align: "center",
			},
		];
		return (
			<>
				{record?.rooms?.length > 0 ? (
					<Table
						columns={columns}
						dataSource={record?.rooms}
						pagination={false}
					/>
				) : (
					<Empty />
				)}
			</>
		);
	};

	return (
		<Box radius={5} className='room-manager-host' direction='vertical'>
			<Space className='room-manager-host__header' direction='horizontal'>
				<label>Chọn ngày để xem số lượng phòng còn trống</label>
				<RangePicker
					className='form-manager-room__input__date'
					value={hackValue || value}
					onChange={onChangeDate}
					disabledDate={disabledDate}
					onCalendarChange={onCalendarChangeCustom}
					onOpenChange={onOpenChange}
					picker='date'
					format='dddd, DD/MM/YYYY'
					placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
				/>
			</Space>
			<Table
				columns={columns}
				dataSource={listHotelHaveRoomEmpty.map((item) => ({
					...item,
					key: item.id,
				}))}
				expandable={{
					expandIcon,
					expandedRowRender,
				}}
				pagination={false}
			/>
			<Pagination style={{ textAlign: "right", marginTop: "20px" }} />
		</Box>
	);
}
export default RoomManageHostPage;
