import { vietNamDong } from "../../../utils/common.utils";
import { EnvironmentTwoTone } from "@ant-design/icons";
import { Rate, Button } from "antd";
import { useNavigate } from "react-router-dom";
function HotelContainer({ data }) {
	const { id, images, name, star, address, priceAverage } = data;
	const navigate = useNavigate();
	const handleClickHotel = () => {
		navigate(`/hotel/${id}`);
	};
	return (
		<div className='hotel' onClick={handleClickHotel}>
			<div className='hotel__left'>
				<div className='hotel__left__big-img'>
					<img src={images[0]} alt='' />
				</div>
				<div className='hotel__left__small-img'>
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
			<div className='hotel__center'>
				<div className='hotel__center__name'>{name}</div>
				<Rate size='small' name='read-only' value={star} readOnly />
				<div className='hotel__center__address'>
					<EnvironmentTwoTone />
					<span>{address}</span>
				</div>

				<div className='hotel__center__convenience'>
					<p>Cơ sở lưu trú này có:</p>
					<div className='hotel__center__convenience__list'>
						<div className='hotel__center__convenience__list__item'>
							<span>Bãi đậu xe</span>
						</div>
						<div className='hotel__center__convenience__list__item'>
							<span>Wifi miễn phí</span>
						</div>
					</div>
				</div>
			</div>
			<div className='hotel__right'>
				<div className='hotel__right__top'>
					<div className='hotel__right__top__text'>
						<p>Tuyệt vời</p>
						<span>672 nhận xét</span>
					</div>
					<div className='hotel__right__top__rating'>
						{/* <ContainRatingIcon /> */}
						<span className='hotel__right__top__rating__text'>
							{star}
						</span>
					</div>
				</div>
				<div className='hotel__right__bottom'>
					<div className='hotel__right__bottom__price'>
						<div className='hotel__right__bottom__price__title'>
							Giá trung bình mỗi đêm
						</div>
						<div className='hotel__right__bottom__price__value'>
							{vietNamDong(priceAverage)}
						</div>
					</div>
					<Button variant='contained' className='hotel__right__btn'>
						Kiểm tra lượng phòng trống
					</Button>
				</div>
			</div>
		</div>
	);
}
export default HotelContainer;
