//files
import Box from "../../components/common/box.core";
import bookingRoomApi from "../../services/modules/bookingRoom.service";
import { handleError } from "../../utils/common.utils";
import { expandIconTable } from "../../components/common/expandIcon.core";
import FormBookingRoom from "../../components/host/BookingRoom";
import { bookingRoomFormSchema } from "../../validate/booking-room.validate";
import ButtonCore from "../../components/common/button.core";

//libs
import {
	Empty,
	Space,
	Table,
	Modal,
	Pagination,
	Tag,
	message,
} from "antd";
import { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import showConfirmDelete from "../../components/admin/common/ConfirmDelete.admin";

function ListBookingHostPage() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm({
		resolver: yupResolver(bookingRoomFormSchema),
		defaultValues: {
			phone: "",
			customerName: "",
		},
	});

	const [listHotelHaveRoomBooking, setListHotelHaveRoomBooking] = useState(
		[]
	);
	const [totalPage, setTotalPage] = useState(0);
	const [queryParams, setQueryParams] = useSearchParams();
	const [isRender, setIsRender] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const [isModalOpen, setIsModalOpen] = useState(false);

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
				} = await bookingRoomApi.getListForHost(params);
				setListHotelHaveRoomBooking(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [queryParams, messageApi, isRender]);

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

	const expandedRowRender = (record) => {
		const renderColor = {
			SYSTEM: ["geekblue", "Website"],
			HOTEL: ["green", "Tại khách sạn"],
		};
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
				key: "roomType",
				render: (data) => data?.name,
			},
			{
				title: "Email khách hàng",
				dataIndex: "email",
				key: "email",
			},
			{
				title: "Số lượng phòng",
				dataIndex: "numRooms",
				key: "numRooms",
				align: "center",
			},
			{
				title: "Đặt tại",
				dataIndex: "orderBy",
				key: "orderBy",
				align: "center",
				render: (data) => {
					return (
						<Tag align="center" color={renderColor[data]?.[0]}>
							{renderColor[data]?.[1]}
						</Tag>
					);
				},
			},
			{
				title: "Ngày check in",
				dataIndex: "checkInDate",
				key: "checkInDate",
				align: "center",
				render: (data) =>
					dayjs(data).format("dddd, DD/MM/YYYY, HH:mm:ss"),
			},
			{
				title: "Ngày check out",
				dataIndex: "checkOutDate",
				key: "checkOutDate",
				align: "center",
				render: (data) =>
					dayjs(data).format("dddd, DD/MM/YYYY, HH:mm:ss"),
			},
			{
				title: "",
				key: "action",
				render: (_, record) => {
					if (record.orderBy === "SYSTEM") {
						return "";
					}

					return (
						<Space size="middle">
							<ButtonCore
								ghost
								danger
								onClick={() =>
									showConfirmDelete(() =>
										handleDelete(record.id)
									)
								}
							>
								Xóa
							</ButtonCore>
						</Space>
					);
				},
			},
		];
		return (
			<>
				{record?.bookingRooms?.length > 0 ? (
					<Table
						columns={columns}
						dataSource={record?.bookingRooms}
						pagination={false}
					/>
				) : (
					<Empty />
				)}
			</>
		);
	};

	const handleOkModal = async (data) => {
		try {
			setIsModalOpen(false);
			await bookingRoomApi.createForHost(data);
			messageApi.open({
				type: "success",
				content: "Tạo dữ liệu thành công thành công",
			});
			setIsRender(!isRender);
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.error(errorMessage);
		}
	};

	const handleDelete = async (id) => {
		try {
			await bookingRoomApi.deleteForHost(id);
			messageApi.open({
				type: "success",
				content: "Xóa dữ liệu thành công",
			});
			setIsRender(!isRender);
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.error(errorMessage);
		}
	};
	
	return (
		<Box radius={5} className="list-room-booked" direction="vertical">
			{contextHolder}
			<Space className="list-room-booked__header" direction="horizontal">
				<Search
					placeholder="Nhập tên khách sạn"
					size="large"
					enterButton
					style={{ width: "300px", marginRight: "10px" }}
				/>
				<ButtonCore
					type="primary"
					ghost
					onClick={() => setIsModalOpen(true)}
					size="large"
				>
					Thêm
				</ButtonCore>
			</Space>
			<Table
				columns={columns}
				dataSource={listHotelHaveRoomBooking.map((item) => ({
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
				onChange={(page) => {
					setQueryParams({
						page: parseInt(page),
						searchQuery: queryParams.get("searchQuery") || "",
					});
				}}
			/>
			<Modal
				title={"Tạo lịch booking cho khách sạn"}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={handleSubmit(handleOkModal)}
				styles={{
					header: {
						textAlign: "center",
						textTransform: "uppercase",
					},
				}}
			>
				<FormBookingRoom
					register={register}
					errors={errors}
					control={control}
					getValues={getValues}
					setValue={setValue}
				/>
			</Modal>
		</Box>
	);
}
export default ListBookingHostPage;
