//files
import ButtonCore from "../../components/common/button.core";
import {
	ExtensionContainer,
	SubExtension,
} from "../../components/admin/Setting/SubExtension";
import { extensionFormSchema } from "../../validate/setting.validate";
import subExtensionApi from "../../services/modules/subExtension.service";
import extensionApi from "../../services/modules/extension.service";
import { handleError } from "../../utils/common.utils";
import ContainerAdmin from "../../components/admin/common/Container.admin";
import showConfirmDelete from "../../components/admin/common/ConfirmDelete.admin";

//libs
import { useEffect, useState } from "react";
import { Space, Table, Modal, message, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

//icons
import { FaAngleRight } from "react-icons/fa6";


function ExtensionManagerPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
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
			description: "",
			extensionId: "",
		},
		resolver: yupResolver(extensionFormSchema),
	});

	const [formData, setFormData] = useState({
		title: "",
		status: "",
		isSub: false,
	});

	const [listExtension, setListExtension] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [queryParams, setQueryParams] = useSearchParams();

	const [messageApi, contextHolder] = message.useMessage();
	const [isRender, setIsRender] = useState(false);
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
				} = await extensionApi.getList(params);
				setListExtension(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				message.error(errorMessage);
			}
		})();
	}, [queryParams, isRender]);

	const onClickAdd = (isSub, extensionId = "") => {
		const formData = {
			title: isSub ? "Tạo mới tiện ích con" : "Tạo mới tiện ích",
			status: "create",
			isSub: isSub,
		};
		reset({
			id: "",
			name: "",
			description: "",
			extensionId: extensionId,
		});
		setFormData(formData);
		setIsModalOpen(true);
	};

	const onclickEdit = (isSub, data) => {
		const formData = {
			title: isSub ? "Chỉnh sửa tiện ích con" : "Chỉnh sửa tiện ích",
			status: "update",
			isSub: isSub,
		};
		setValue("id", data.id);
		setValue("name", data.name);
		const valueKey = isSub ? "extensionId" : "description";
		setValue(valueKey, data[valueKey]);
		setFormData(formData);
		setIsModalOpen(true);
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
			title: "Tên tiện ích",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
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
						onClick={() => onclickEdit(false, record)}
					>
						Edit
					</ButtonCore>
					<ButtonCore
						ghost
						danger
						onClick={() =>
							showConfirmDelete(() =>
								handleDelete(false, record.id)
							)
						}
					>
						Delete
					</ButtonCore>
				</Space>
			),
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
				<FaAngleRight
					className='expand-icon'
					style={{
						transform: expanded ? "rotate(90deg)" : "",
					}}
				/>
			</span>
		);
	};

	const handleCreate = async (data) => {
		try {
			if (formData.isSub) {
				const dataCreate = {
					name: data.name,
					extensionId: data.extensionId,
				};
				await subExtensionApi.create(dataCreate);
			} else {
				const dataCreate = {
					name: data.name,
					description: data.description,
				};
				await extensionApi.create(dataCreate);
			}

			messageApi.open({
				type: "success",
				content: "Tạo dữ liệu thành công thành công",
			});
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

	const handleUpdate = async (data) => {
		try {
			if (formData.isSub) {
				const dataUpdate = {
					id: data.id,
					name: data.name,
					extensionId: data.extensionId,
				};
				await subExtensionApi.update(dataUpdate);
			} else {
				const dataUpdate = {
					id: data.id,
					name: data.name,
					description: data.description,
				};
				await extensionApi.update(dataUpdate);
			}

			setIsModalOpen(false);
			messageApi.open({
				type: "success",
				content: "Cập nhật dữ liệu thành công",
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

	const handleModelOk = async (data) => {
		if (formData.status === "create") {
			await handleCreate(data);
		} else {
			await handleUpdate(data);
		}
	};
	const handleDelete = async (checkSub, id) => {
		try {
			if (checkSub) {
				await subExtensionApi.delete(id);
			} else {
				await extensionApi.delete(id);
			}
			messageApi.open({
				type: "success",
				content: "Xóa dữ liệu thành công",
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
					onClick={() => onClickAdd(false)}
					size='large'
				>
					Thêm
				</ButtonCore>
			</Space>
			<Table
				columns={columns}
				dataSource={listExtension.map((r, i) => ({ ...r, key: i }))}
				expandable={{
					expandIcon,
					expandedRowRender: (record) => (
						<SubExtension
							data={record.subExtensions}
							extensionId={record.id}
							onClickAdd={onClickAdd}
							onclickEdit={onclickEdit}
							handleDelete={handleDelete}
						/>
					),
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
				title={formData.title}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={handleSubmit(handleModelOk)}
			>
				<ExtensionContainer
					register={register}
					errors={errors}
					isSub={formData.isSub}
				/>
			</Modal>
		</ContainerAdmin>
	);
}
export default ExtensionManagerPage;
