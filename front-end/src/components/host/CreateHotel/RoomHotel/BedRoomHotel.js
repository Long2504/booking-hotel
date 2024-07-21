//files
import VolumeHost from "../../common/Volume.host";
import ButtonCore from "../../../common/button.core";
import SelectCore from "../../../common/select.core";
import bedTypeApi from "../../../../services/modules/bedType.service";

//libs
import { Space } from "antd";
import { useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";


function BedRoomHotel({
	control,
	errors,
	register,
	setValue,
	getValues,
	indexRoom,
}) {
 
	const [listTypeBed, setListTypeBed] = useState([]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: `rooms.${indexRoom}.beds`,
	});

	useEffect(() => {
		(async () => {
			try {
				const params = {
					page: 1,
					pageSize: 1000,
				};
				const {
					metaData: { list },
				} = await bedTypeApi.getList(params);
				setListTypeBed(list);
			} catch (error) {}
		})();
	}, []);

	const handleAddBed = () => {
		const newOptions = [];
		const listBedCurrent = getValues(`rooms.${indexRoom}.beds`);
		listTypeBed.forEach((item) => {
			if (!listBedCurrent?.some((bed) => bed?.bedTypeId === item?.id)) {
				newOptions.push(item);
			}
		});

		setListTypeBed(newOptions);
		append({ quantity: 1, bedTypeId: "" });
	};

	const handleRemoveBed = (index) => {
		remove(index);
	};

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
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
			{fields?.map((_, index) => {
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
							name={`rooms.${indexRoom}.beds.${index}.quantity`}
							min={1}
							max={10}
							setValue={setValue}
							getValues={getValues}
							width={"40%"}
							error={errors?.[index]?.quantity}
						/>
						<SelectCore
							label={"Loại giường"}
							data={listTypeBed?.map((item) => ({
								value: item?.id,
								label: item?.name,
							}))}
							width={"300px"}
							placeholder={"Chọn loại giường"}
							control={control}
							name={`rooms.${indexRoom}.beds.${index}.bedTypeId`}
							error={errors?.[index]?.bedTypeId}
						/>
						{index > 0 && (
							<ButtonCore
								onClick={() => handleRemoveBed(index)}
								danger
								ghost
							>
								Delete
							</ButtonCore>
						)}
					</div>
				);
			})}
			{listTypeBed?.length > 0 && (
				<ButtonCore onClick={() => handleAddBed()} type="primary" ghost>
					THÊM LOẠI GIƯỜNG KHÁC
				</ButtonCore>
			)}
		</Space>
	);
}

export default BedRoomHotel;
