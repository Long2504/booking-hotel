//files
import Box from "../../common/box.core";
import { vietNamDong } from "../../../utils/common.utils";

//libs
import { Rate, Button } from "antd";
import { useNavigate } from "react-router-dom";

//icons
import { FaLocationDot } from "react-icons/fa6";
function HotelContainer({ data }) {
	const { id, images, name, star, address, priceAverage } = data;
	const navigate = useNavigate();
	const handleClickHotel = () => {
		navigate(`/hotel/${id}`);
	};
	return (
		<Box radius={5} className='hotel-container' onClick={handleClickHotel}>
			<div className='hotel-container__left'>
				<div className='hotel-container__left__big-img'>
					<img src={images[0]} alt='' />
				</div>
				<div className='hotel-container__left__small-img'>
					{images.slice(1).map((image, index) => {
						if (index < 4) {
							return (
								<img
									key={index}
									height='40px'
									src={image}
									alt=''
								/>
							);
						}
						return null;
					})}
				</div>
			</div>

			<div className='hotel-container__center'>
				<div className='hotel-container__center__name'>{name}</div>
				<Rate size='small' name='read-only' value={star} readOnly />
				<div className='hotel-container__center__address'>
					<FaLocationDot />
					<span>{address}</span>
				</div>
				<div className='hotel-container__center__convenience'>
					<p>Cơ sở lưu trú này có:</p>
					<div className='hotel-container__center__convenience__list'>
						<Box radius={3} className='hotel-container__center__convenience__list__item'>
							<span>Bãi đậu xe</span>
						</Box>
						<Box radius={3} className='hotel-container__center__convenience__list__item'>
							<span>Wifi miễn phí</span>
						</Box>
					</div>
				</div>
			</div>

			<div className='hotel-container__right'>
				<div className='hotel-container__right__top'>
					<div className='hotel-container__right__top__text'>
						<p>Tuyệt vời</p>
						<span>672 nhận xét</span>
					</div>
					<div className='hotel-container__right__top__rating'>
						<span className='hotel-container__right__top__rating__text'>
							{star}
						</span>
					</div>
				</div>
				<div className='hotel-container__right__bottom'>
					<div className='hotel-container__right__bottom__price'>
						<div className='hotel-container__right__bottom__price__title'>
							Giá trung bình mỗi đêm
						</div>
						<div className='hotel-container__right__bottom__price__value'>
							{vietNamDong(priceAverage)}
						</div>
					</div>
					<Button
						variant='contained'
						className='hotel-container__right__btn'
					>
						Kiểm tra lượng phòng trống
					</Button>
				</div>
			</div>
		</Box>
	);
}
export default HotelContainer;
