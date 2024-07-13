import { Space, Rate } from "antd";
import { descriptionHotelHost } from "../../../assets/images/index.image";
import InputCore from "../../common/input.core";
import Box from "../../common/box.core";
import TextAreaCore from "../../common/textArea.core";

function DescriptionHotel() {
	return (
		<Space direction='vertical' className='description-hotel-host'>
			<div className='description-hotel-host__title'>
				<Space direction='vertical'>
					<h1>
						Những ưu điểm và nét độc đáo tại chỗ ở của bạn là gì?
					</h1>
					<p>
						Mỗi căn phòng, mỗi ngôi nhà đều có những nét độc đáo
						riêng. Hãy giới thiệu các đặc điểm nổi bật tại nơi ở của
						bạn.
					</p>
				</Space>
				<img
					src={descriptionHotelHost}
					alt=''
					className='description-hotel-host__title__img'
				/>
			</div>
			<Space
				direction='vertical'
				className='description-hotel-host__content'
			>
				<Space direction='vertical'>
					<h2>Đặt tên cho khách sạn</h2>
					<p>
						Hãy tận dụng và làm cho nó nghe có vẻ hấp dẫn. Đừng lo
						lắng, chúng tôi sẽ tạo các ngôn ngữ khác bằng mẫu dịch
						chuẩn.
					</p>
				</Space>
				<Box
					radius={5}
					className='description-hotel-host__content__item'
				>
					<InputCore
						placeholder='Ví dụ: Romantic beach getaway, perfect for honeymooners'
						count={{
							max: 50,
						}}
					/>
				</Box>
				<Space direction='vertical'>
					<h2>Mô tả chỗ quý đối tác</h2>
					<p>Những đặc điểm nổi bật của căn hộ để thu hút du khách</p>
				</Space>
				<Box
					radius={5}
					className='description-hotel-host__content__item'
				>
					<TextAreaCore
						rows={8}
						placeholder='Cho dù làm việc từ xa hay du lịch cùng gia đình, 0 Bedroom 1 Bathroom Apartment in London là lựa chọn tuyệt vời để lưu trú tại London. Từ chỗ nghỉ, quý khách có thể tận hưởng hết mọi điều sôi động tại thành phố sôi động này. Với vị trí thuận lợi, quý khách có thể dễ dàng đi đến mọi điểm du lịch không thể bỏ qua tại London.'
					/>
				</Box>
				<Space direction='vertical'>
					<h2>Xếp hạng sao</h2>
					<p>
						Đánh giá để giúp khách hàng hình dung cụ thể hơn về nơi
						ở.
					</p>
				</Space>
				<Box
					radius={5}
					className='description-hotel-host__content__item'
				>
					<Rate />
				</Box>
			</Space>
		</Space>
	);
}

export default DescriptionHotel;
