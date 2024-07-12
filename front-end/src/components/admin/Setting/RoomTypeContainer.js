//files
import InputCore from "../../common/input.core";
import TextAreaCore from "../../common/textArea.core";

export const RoomTypeContainer = ({ register, errors }) => {
	return (
		<>
			<InputCore
				label={"Tên loại phòng"}
				placeholder={"Nhập tên loại phòng"}
				name={"name"}
				register={register}
				error={errors?.name}
			/>

			<TextAreaCore
				label={"Mô tả"}
				placeholder={"Nhập mô tả"}
				name={"description"}
				register={register}
				rows={5}
			/>
		</>
	);
};
