//files
import VolumeHost from "../../common/Volume.host";
import BedRoomHotel from "./BedRoomHotel";
import listRoomHotel from "../../../../data/listRoomHotel.data";
import SelectCore from "../../../common/select.core";
import InputCore from "../../../common/input.core";
import { expandIconCollapse } from "../../../common/expandIcon.core";

//libs
import { Collapse, Space, Divider, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonCore from "../../../common/button.core";


const { Panel } = Collapse;
function RoomHotelDetail({ room, indexRoom }) {
	const { register, setValue, getValues } = useForm({
		defaultValues: {
			occupancy: 1,
		},
		resolver: yupResolver({}),
	});

	const headerPanel = () => {
		if (indexRoom === 0) {
			return `Phòng ${indexRoom + 1}  ${
				room?.roomType?.name && "- " + room?.roomType.name
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
					room?.roomType?.name && "- " + room?.roomType?.name
				}`}</p>
				<ButtonCore danger>Delete</ButtonCore>
			</div>
		);
	};

	const listBedroomType = listRoomHotel;
	return (
		<Collapse
			className='room-hotel-host__content__container__item'
			defaultActiveKey={["1"]}
			key={indexRoom}
			expandIcon={expandIconCollapse}
		>
			<Panel
				className='room-hotel-host__content__container__item__body'
				header={headerPanel()}
				key='1'
			>
				<Space
					direction='vertical'
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
					/>
					<InputCore
						label={"Quy mô phòng (m²)"}
						placeholder={"Nhập quy mô phòng"}
					/>
					<Row gutter={[15, 15]}>
						<Col span={8}>
							<VolumeHost
								label={"Số lượng người tối đa"}
								register={register}
								name={"occupancy"}
								min={1}
								max={10}
								setValue={setValue}
								getValues={getValues}
							/>
						</Col>
						<Col span={8}>
							<VolumeHost
								label={"Phòng tắm"}
								register={register}
								name={"bathrooms"}
								min={1}
								max={10}
								setValue={setValue}
								getValues={getValues}
							/>
						</Col>
						<Col span={8}>
							<VolumeHost
								label={"Số lượng phòng"}
								register={register}
								name={"number"}
								min={1}
								max={10}
								setValue={setValue}
								getValues={getValues}
							/>
						</Col>
					</Row>
					<InputCore
						label={"Giá phòng của một đêm"}
						placeholder={"Nhập giá phòng"}
						type={"number"}
					/>

					<Divider
						style={{
							marginBottom: 15,
							marginTop: 15,
							borderWidth: 2,
							borderColor: "var(--primary-color)",
						}}
					/>
					<BedRoomHotel room={room} />
				</Space>
			</Panel>
		</Collapse>
	);
}

export default RoomHotelDetail;
