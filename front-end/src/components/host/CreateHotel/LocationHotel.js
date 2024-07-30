//files
import Box from "../../common/box.core";
import InputCore from "../../common/input.core";
import SelectCore from "../../common/select.core";
import { locationHotelHost } from "../../../assets/images/index.image";
import { districts, provinces, wards } from "../../../utils/dataAddress.utils";

//libs
import { Space } from "antd";
import { useState } from "react";

function LocationHotel({ register, control, errors }) {
	const [codeProvince, setCodeProvince] = useState({
		value: "",
		label: "",
	});
	const [codeDistrict, setCodeDistrict] = useState({
		value: "",
		label: "",
	});
	return (
		<Space direction='vertical' className='location-hotel-host'>
			<div className='location-hotel-host__title'>
				<Space direction='vertical'>
					<h1>Xác định vị trí chỗ ở của bạn trên bản đồ.</h1>
					<p>Khách hàng sẽ ở đâu?</p>
				</Space>
				<img src={locationHotelHost} alt='' />
			</div>

			<Space
				direction='vertical'
				className='location-hotel-host__content'
			>
				<Space direction='vertical'>
					<h2>Vị trí</h2>
					<p>
						Đây có phải là vị trí chính xác của chỗ nghỉ không? Nếu
						không thì hãy kéo cái ghim đến vị trí chính xác.
					</p>
				</Space>
				<Box
					className='location-hotel-host__content__container'
					radius={5}
				>
					<div className='location-hotel-host__content__container__item'>
						<SelectCore
							data={provinces}
							name={"province"}
							label='Thành phố/Tỉnh'
							width={"46%"}
							placeholder={"Chọn tỉnh/thành phố"}
							control={control}
							setValue={setCodeProvince}
							error={errors.province}
						/>
						<SelectCore
							data={districts[codeProvince?.value]}
							name={"district"}
							label='Quận/huyện'
							width={"46%"}
							placeholder={"Chọn quận/huyện"}
							control={control}
							setValue={setCodeDistrict}
							error={errors.district}
						/>
					</div>
					<div className='location-hotel-host__content__container__item'>
						<SelectCore
							data={wards[codeDistrict?.value]}
							name={"ward"}
							label='Xã/phường'
							width={"46%"}
							placeholder={"Chọn xã/phường"}
							control={control}
							error={errors.ward}
						/>
						<InputCore
							label='Số nhà'
							placeholder='Nhập số nhà'
							register={register}
							width={"46%"}
							name='street'
							error={errors.street}
						/>
					</div>
				</Box>
			</Space>
		</Space>
	);
}

export default LocationHotel;
