//files
import VolumeHost from "../../common/Volume.host";
import SelectCore from "../../../common/select.core";
import InputCore from "../../../common/input.core";
import { expandIconCollapse } from "../../../common/expandIcon.core";
import ButtonCore from "../../../common/button.core";
import BedRoomHotel from "./BedRoomHotel";
import roomTypeApi from "../../../../services/modules/roomType.service";

//libs
import { Collapse, Space, Divider, Row, Col } from "antd";
import { useEffect, useState } from "react";


const { Panel } = Collapse;
function RoomHotelDetail({
	indexRoom,
	register,
	setValue,
	getValues,
	control,
	errors,
	handleRemoveRoom,
}) {
	const [listBedroomType, setListBedroomType] = useState([]);
	const [roomType, setRoomType] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const params = {
					page: 1,
					pageSize: 1000,
				}
				const {
					metaData: { list },
				} = await roomTypeApi.getList(params);
				setListBedroomType(list);
			} catch (error) {}
		})();
	}, []);

	const headerPanel = () => {
		if (indexRoom === 0) {
			return `Phòng ${indexRoom + 1} ${
				roomType && `- ${roomType?.label}`
			}`;
		}
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<p>{`Phòng ${indexRoom + 1}  ${
					roomType && "- " + roomType?.label
				}`}</p>
				<ButtonCore danger onClick={() => handleRemoveRoom(indexRoom)}>
					Delete
				</ButtonCore>
			</div>
		);
	};

	return (
		<Collapse
			className="room-hotel-host__content__container__item"
			defaultActiveKey={["1"]}
			key={indexRoom}
			expandIcon={expandIconCollapse}
		>
			<Panel
				className="room-hotel-host__content__container__item__body"
				header={headerPanel()}
				key="1"
			>
				<Space
					direction="vertical"
					style={{
						width: "100%",
					}}
				>
					<h4>Thông tin chi tiết cơ bản</h4>

					<SelectCore
						label={"Tên phòng"}
						placeholder={"Chọn phòng"}
						data={listBedroomType?.map((item) => ({
							value: item?.id,
							label: item?.name,
						}))}
						name={`rooms.${indexRoom}.roomTypeId`}
						control={control}
						setValue={setRoomType}
						error={errors?.roomTypeId}
					/>
					<InputCore
						label={"Quy mô phòng (m²)"}
						placeholder={"Nhập quy mô phòng"}
						type={"number"}
						name={`rooms.${indexRoom}.area`}
						error={errors?.area}
						register={register}
					/>
					<Row gutter={[15, 15]}>
						<Col span={8}>
							<VolumeHost
								label={"Số lượng người tối đa"}
								min={1}
								max={10}
								setValue={setValue}
								getValues={getValues}
								name={`rooms.${indexRoom}.occupancy`}
								register={register}
								error={errors?.occupancy}
							/>
						</Col>
						<Col span={8}>
							<VolumeHost
								label={"Phòng tắm"}
								min={0}
								max={10}
								setValue={setValue}
								getValues={getValues}
								name={`rooms.${indexRoom}.numBathrooms`}
								register={register}
								error={errors?.bathrooms}
							/>
						</Col>
						<Col span={8}>
							<VolumeHost
								label={"Số lượng phòng"}
								name={`rooms.${indexRoom}.numBedrooms`}
								min={1}
								max={10}
								setValue={setValue}
								getValues={getValues}
								register={register}
								error={errors?.number}
							/>
						</Col>
					</Row>
					<InputCore
						label={"Giá phòng của một đêm"}
						placeholder={"Nhập giá phòng"}
						type={"number"}
						name={`rooms.${indexRoom}.price`}
						error={errors?.price}
						register={register}
					/>

					<Divider
						style={{
							marginBottom: 15,
							marginTop: 15,
							borderWidth: 2,
							borderColor: "var(--primary-color)",
						}}
					/>
					<BedRoomHotel
						control={control}
						register={register}
						errors={errors?.beds}
						setValue={setValue}
						getValues={getValues}
						indexRoom={indexRoom}
					/>
				</Space>
			</Panel>
		</Collapse>
	);
}

export default RoomHotelDetail;
