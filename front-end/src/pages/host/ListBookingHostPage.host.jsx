import { Button, Empty, Space, Table, Modal, Pagination, Tag } from "antd";
import { useState } from "react";
import Search from "antd/es/input/Search";
import { RightOutlined } from "@ant-design/icons";
import Box from "../../components/common/box.core";

function ListBookingHostPage() {
	const listHotelHaveRoomBooking = [];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		data: {
			hotelId: "",
			startDate: "",
			endDate: "",
			roomId: "",
			numberRoom: 0,
			roomEmpty: 0,
		},
		status: "",
	});

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
				dataIndex: "room",
				key: "name",
				render: (data) => data?.roomType?.name,
			},
			{
				title: "Email khách hàng",
				dataIndex: "customer",
				key: "customer",
				render: (data) => data?.email,
			},
			{
				title: "Số lượng phòng",
				dataIndex: "numberRoom",
				key: "numberRoom",
				align: "center",
			},
			{
				title: "Đặt tại",
				dataIndex: "status",
				key: "status",
				align: "center",
				render: (data) => {
					let color = data === "system" ? "geekblue" : "green";
					let content =
						data === "system" ? "Website" : "Tại khách sạn";
					return (
						<Tag align='center' color={color}>
							{content}
						</Tag>
					);
				},
			},
			{
				title: "Ngày check in",
				dataIndex: "checkInDate",
				key: "checkInDate",
				align: "center",
			},
			{
				title: "Ngày check out",
				dataIndex: "checkOutDate",
				key: "checkOutDate",
				align: "center",
			},
			{
				title: "",
				key: "action",
				render: (_, record) => {
					if (record.status === "system") {
						return "";
					}

					return (
						<Space size='middle'>
							<Button>Chỉnh sửa</Button>
							<Button>Xóa</Button>
						</Space>
					);
				},
			},
		];
		return (
			<>
				{record?.trackingRooms?.length > 0 ? (
					<Table
						columns={columns}
						dataSource={record?.trackingRooms}
						pagination={false}
					/>
				) : (
					<Empty />
				)}
				<Button
					type='primary'
					style={{ marginTop: "10px", float: "right" }}
				>
					Thêm
				</Button>
			</>
		);
	};

	return (
		<Box radius={5} className='list-room-booked' direction='vertical'>
			<Space className='list-room-booked__header' direction='horizontal'>
				<Search
					placeholder='Nhập tên khách sạn'
					size='large'
					enterButton
					style={{ width: "300px", marginRight: "10px" }}
				/>
			</Space>
			<Table
				columns={columns}
				dataSource={listHotelHaveRoomBooking.map((item) => ({
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
			<Modal
				title={formData.title}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
			>
				<div>Modal</div>
			</Modal>
		</Box>
	);
}
export default ListBookingHostPage;
