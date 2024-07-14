//files
import VolumeHost from "../../common/Volume.host";
import ButtonCore from "../../../common/button.core";
import SelectCore from "../../../common/select.core";

//libs
import { Space, Button } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function BedRoomHotel({ room }) {
	const idRoom = room?.id;
	const listBed = [
		{
			id: "0849ffcc-7adc-42a0-bd6c-86efa4bd22d4",
			name: "Giường đôi",
		},
		{
			id: "0b584c63-546b-4540-972f-93d038832865",
			name: "Giường đơn",
		},
	];
	const newOption = [];
	for (const option of listBed) {
		let check = false;
		for (const item of room?.bed) {
			if (option?.id === item?.bedType?.id) {
				check = true;
				break;
			}
		}
		if (!check) newOption.push(option);
	}
	return (
		<Space direction='vertical' style={{ width: "100%" }}>
			<p
				style={{
					fontWeight: 500,
					color: "rgba(0, 0, 0, 0.8)",
					margin: "8px 0px",
					fontSize: "16px",
				}}
			>
				Giường ngủ
			</p>
			{room?.bed?.map((bed, index) => {
				return (
					<Bed
						key={index}
						bed={bed}
						index={index}
						options={newOption}
						idRoom={idRoom}
					/>
				);
			})}
			{newOption?.length > 0 && (
				<ButtonCore onClick={() => {}} type='primary' ghost>
					THÊM LOẠI GIƯỜNG KHÁC
				</ButtonCore>
			)}
		</Space>
	);
}

function Bed({ bed, index, options }) {
	const { register, setValue, getValues } = useForm({
		defaultValues: {
			occupancy: 1,
		},
		resolver: yupResolver({}),
	});
	return (
		<div
			style={{
				display: "flex",
			}}
			key={index}
		>
			<VolumeHost
				label={"Số lượng giường"}
				register={register}
				name={"number"}
				min={1}
				max={10}
				setValue={setValue}
				getValues={getValues}
				width={"40%"}
			/>
			<SelectCore
				label={"Loại giường"}
				data={options?.map((item) => ({
					value: item?.id,
					label: item?.name,
				}))}
				width={"300px"}
				placeholder={"Chọn loại giường"}
			/>
			{index > 0 && <Button>Delete</Button>}
		</div>
	);
}
export default BedRoomHotel;
