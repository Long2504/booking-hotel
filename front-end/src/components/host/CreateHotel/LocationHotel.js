//files
import Box from "../../common/box.core";
import InputCore from "../../common/input.core";
import SelectCore from "../../common/select.core";
import { locationHotelHost } from "../../../assets/images/index.image";

//libs
import { Space } from "antd";
import { useForm } from "react-hook-form";

function LocationHotel() {
	const { register } = useForm();
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
							data={[]}
							label='Thành phố/Tỉnh'
							width={"46%"}
							register={register}
							placeholder={"Chọn tỉnh/thành phố"}
						/>
						<SelectCore
							data={[]}
							label='Quận/huyện'
							width={"46%"}
							register={register}
							placeholder={"Chọn quận/huyện"}
						/>
					</div>
					<div className='location-hotel-host__content__container__item'>
						<SelectCore
							data={[]}
							label='Xã/phường'
							width={"46%"}
							register={register}
							placeholder={"Chọn xã/phường"}
						/>
						<InputCore
							label='Số nhà'
							placeholder='Nhập số nhà'
							register={register}
							width={"46%"}
							name='streetNumber'
						/>
					</div>
				</Box>
			</Space>
		</Space>
	);
}

export default LocationHotel;
