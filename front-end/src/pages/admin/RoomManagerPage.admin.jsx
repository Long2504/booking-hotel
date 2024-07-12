//files
import ContainerAdmin from "../../components/admin/common/Container.admin";
import ButtonCore from "../../components/common/button.core";
import { handleError } from "../../utils/common.utils";
import { roomTypeFormSchema } from "../../validate/setting.validate";
import showConfirmDelete from "../../components/admin/common/ConfirmDelete.admin";
import roomTypeApi from "../../services/modules/roomType.service";
import { RoomTypeContainer } from "../../components/admin/Setting/RoomTypeContainer";

//libs
import { Modal, Pagination, Space, Table, message } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function RoomManagerPage() {
	const [queryParams, setQueryParams] = useSearchParams();
	const [listRoomType, setListRoomType] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [messageApi, contextHolder] = message.useMessage();
	const [formData, setFormData] = useState({
		title: "",
		status: "",
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			id: "",
			name: "",
		},
		resolver: yupResolver(roomTypeFormSchema),
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRender, setIsRender] = useState(false);

	const clickCreateOrUpdate = (isCreate, data) => {
		if (isCreate) {
			setFormData({
				title: "Tạo loại phòng mới",
				status: "create",
			});
			reset();
		} else {
			setValue("id", data.id);
			setValue("name", data.name);
			setValue("description", data.description);
			setFormData({
				title: "Chỉnh sửa loại phòng",
				status: "update",
			});
		}
		setIsModalOpen(true);
	};

	const handleModelOk = async (data) => {
		try {
			if (formData.status === "create") {
				const dataCreate = {
					name: data.name,
					description: data.description,
				};
				await roomTypeApi.create(dataCreate);
				messageApi.open({
					type: "success",
					content: "Tạo dữ liệu thành công",
				});
			} else {
				const dataUpdate = {
					id: data.id,
					name: data.name,
					description: data.description,
				};
				await roomTypeApi.update(dataUpdate);
				messageApi.open({
					type: "success",
					content: "Cập nhật dữ liệu thành công",
				});
			}

			setIsRender(!isRender);
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		} finally {
			setIsModalOpen(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await roomTypeApi.delete(id);
			messageApi.open({
				type: "success",
				content: "Xóa dữ liệu thành công",
			});
			setIsRender(!isRender);
		} catch (error) {
			const { errorMessage } = handleError(error);
			messageApi.open({
				type: "error",
				content: errorMessage,
			});
		}
	};
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
				} = await roomTypeApi.getList(params);
				setListRoomType(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				message.error(errorMessage);
			}
		})();
	}, [queryParams, isRender]);

	const columns = [
		{
			title: "STT",
			key: "stt",
			width: "5%",
			align: "center",
			render: (_, record, index) => index + 1,
		},
		{
			title: "TÊN LOẠI GIƯỜNG",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "NGÀY TẠO",
			dataIndex: "createdAt",
			key: "createdAt",
			align: "center",
			render: (date) => dayjs(date).format("dddd, DD/MM/YYYY, HH:mm:ss"),
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<Space size='middle'>
					<ButtonCore
						type='primary'
						ghost
						onClick={() => clickCreateOrUpdate(false, record)}
					>
						Edit
					</ButtonCore>
					<ButtonCore
						ghost
						danger
						onClick={() =>
							showConfirmDelete(() => handleDelete(record.id))
						}
					>
						Delete
					</ButtonCore>
				</Space>
			),
		},
	];
	return (
		<ContainerAdmin className='container-admin'>
			{contextHolder}
			<Space className='container-admin__header' direction='horizontal'>
				<Search
					placeholder='Tìm kiếm theo tên tiện ích'
					enterButton
					style={{
						width: "300px",
						marginRight: "10px",
					}}
					size='large'
					value={queryParams.get("searchQuery") || ""}
					onChange={(e) => {
						setQueryParams({
							page: 1,
							searchQuery: e.target.value,
						});
					}}
				/>
				<ButtonCore
					type='primary'
					ghost
					size='large'
					onClick={() => clickCreateOrUpdate(true)}
				>
					Thêm
				</ButtonCore>
			</Space>
			<Table
				columns={columns}
				dataSource={listRoomType.map((r, i) => ({ key: i, ...r }))}
				pagination={false}
			/>
			<Pagination
				style={{ textAlign: "right", marginTop: "20px" }}
				current={parseInt(queryParams.get("page")) || 1}
				total={totalPage}
				onChange={(page) => {
					setQueryParams({
						page: parseInt(page),
						searchQuery: queryParams.get("searchQuery") || "",
					});
				}}
			/>
			<Modal
				title={formData.title}
				open={isModalOpen}
				onOk={handleSubmit(handleModelOk)}
				onCancel={() => setIsModalOpen(false)}
			>
				<RoomTypeContainer register={register} errors={errors} />
			</Modal>
		</ContainerAdmin>
	);
}
export default RoomManagerPage;
