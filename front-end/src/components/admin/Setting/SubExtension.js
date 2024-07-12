import { Table, Empty, Space } from "antd";
import ButtonCore from "../../common/button.core";
import InputCore from "../../common/input.core";
import TextAreaCore from "../../common/textArea.core";
import dayjs from "dayjs";
import showConfirmDelete from "../common/ConfirmDelete.admin";

export const SubExtension = ({
	data,
	onClickAdd,
	onclickEdit,
	extensionId,
	handleDelete,
}) => {
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
			title: "Tên tiện ích",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Ngày tạo",
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
						onClick={() => onclickEdit(true, record)}
					>
						Edit
					</ButtonCore>
					<ButtonCore
						danger
						ghost
						onClick={() =>
							showConfirmDelete(() =>
								handleDelete(true, record.id)
							)
						}
					>
						Delete
					</ButtonCore>
				</Space>
			),
		},
	];
	return (
		<>
			{data?.length > 0 ? (
				<Table
					columns={columns}
					dataSource={data.map((r, i) => ({ ...r, key: i }))}
					pagination={false}
				/>
			) : (
				<Empty />
			)}
			<ButtonCore
				type='primary'
				ghost
				style={{ marginTop: "10px", float: "right" }}
				onClick={() => onClickAdd(true, extensionId)}
			>
				Thêm
			</ButtonCore>
		</>
	);
};

export const ExtensionContainer = ({ register, errors, isSub }) => {
	return (
		<>
			<InputCore
				label={"Tên tiện ích"}
				placeholder={"Nhập tên tiện ích"}
				name={"name"}
				register={register}
				error={errors?.name}
			/>
			{!isSub && (
				<TextAreaCore
					label={"Mô tả"}
					placeholder={"Nhập mô tả"}
					name={"description"}
					register={register}
					rows={5}
				/>
			)}
		</>
	);
};
