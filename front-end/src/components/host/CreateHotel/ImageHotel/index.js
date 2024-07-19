//files
import ImageItem from "./imageItem";
import { photoHotelHost } from "../../../../assets/images/index.image";

//libs
import { Space } from "antd";

function ImageHotel({ getValues,register }) {
	const hotel = {};
	const listRoom = getValues("rooms") || [];
	return (
		<Space direction='vertical' className='photo-hotel-host'>
			<div className='photo-hotel-host__title'>
				<Space direction='vertical'>
					<h1>Cho khách hàng xem những gì họ đang bỏ lỡ.</h1>
					<p>
						Hình ảnh rất quan trọng đối với du khách. Hãy đăng càng
						nhiều ảnh chất lượng cao càng tốt. Bạn có thể thêm ảnh
						về sau. Agoda có sẵn những bí kíp đăng tải ảnh chất
						lượng để thu hút nhiều đặt phòng hơn.
					</p>
					<p>* Mẹo: tối thiểu 800x600 px — lý tưởng 2048x1536 px</p>
				</Space>
				<img
					src={photoHotelHost}
					alt=''
					className='photo-hotel-host__title__img'
				/>
			</div>
			<Space direction='vertical' className='photo-hotel-host__content'>
				<ImageItem
					title={"Hình ảnh khách sạn(tối thiểu 3)"}
					description={
						"Mặt ngoài của tòa nhà, (các) chỗ để xe, lối vào, và mọi cơ sở vật chất có sẵn"
					}
					urlList={hotel?.images}
				/>
				{listRoom.map((room, index) => {
					return (
						<ImageItem
							key={index}
							idRoom={room?.id}
							title={room?.name}
							urlList={room?.images}
							description={
								"(Các) phòng ngủ, phòng tắm, bếp, và khu vực ăn uống/tiếp khách của căn"
							}
						/>
					);
				})}
			</Space>
		</Space>
	);
}

export default ImageHotel;
