//files
import InputCore from "../../common/input.core";

export const BedTypeContainer = ({ register, errors }) => {
	return (
		<>
			<InputCore
				label={"Tên loại giường"}
				placeholder={"Nhập tên loại giường"}
				name={"name"}
				register={register}
				error={errors?.name}
			/>
		</>
	);
};
