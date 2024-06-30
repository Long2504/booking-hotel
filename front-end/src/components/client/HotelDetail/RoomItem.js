import { vietNamDong } from "../../../utils/common.utils";

function RoomItem({ data, linkToChekout, checkView = false }) {
	return (
		<div className='hotel-detail-page__list-room__container__room'>
			<div className='hotel-detail-page__list-room__container__room__name'>
				{data?.roomType?.name}
			</div>
			<div className='hotel-detail-page__list-room__container__room__content'>
				<div className='hotel-detail-page__list-room__container__room__content__header'>
					<div className='hotel-detail-page__list-room__container__room__content__image'>
						Ảnh
					</div>
					<div className='hotel-detail-page__list-room__container__room__content__detail'>
						Chi tiết
					</div>
					<div className='hotel-detail-page__list-room__container__room__content__occupancy'>
						Sức chứa
					</div>
					<div className='hotel-detail-page__list-room__container__room__content__price'>
						Giá phòng/đêm
					</div>
					<div className='hotel-detail-page__list-room__container__room__content__total'>
						Số lượng
					</div>
				</div>
				<div className='hotel-detail-page__list-room__container__room__content__body'>
					<div className='hotel-detail-page__list-room__container__room__content__image'>
						<img
							src={data?.images.length > 0 ? data?.images[0] : ""}
							alt=''
						/>
					</div>
					<div
						className='hotel-detail-page__list-room__container__room__content__detail'
						style={{ borderRight: "1px solid #ccc" }}
					>
						<div className='hotel-detail-page__list-room__container__room__content__detail__item'>
							<label>Diện tích </label>
							<span>{data?.area} m²</span>
						</div>
						<div className='hotel-detail-page__list-room__container__room__content__detail__item'>
							{data?.beds?.map((bed, index) => {
								if (index === 0) {
									return (
										<span key={index}>
											{bed?.number +
												" " +
												bed?.bedType?.name}
										</span>
									);
								} else
									return (
										<span key={index}>
											{", " +
												bed?.number +
												" " +
												bed?.bedType?.name}
										</span>
									);
							})}
						</div>
						<div className='hotel-detail-page__list-room__container__room__content__detail__item'>
							<label>Phòng tắm: </label>
							<span>{data?.bathrooms + " phòng"}</span>
						</div>
					</div>
					<div
						className='hotel-detail-page__list-room__container__room__content__occupancy'
						style={{ borderRight: "1px solid #ccc" }}
					>
						<div className='hotel-detail-page__list-room__container__room__content__occupancy__item'>
							{data?.occupancy}
						</div>
					</div>
					<div
						className='hotel-detail-page__list-room__container__room__content__price'
						style={{ borderRight: "1px solid #ccc" }}
					>
						<div className='hotel-detail-page__list-room__container__room__content__price__item'>
							<h3>{vietNamDong(data?.price || 0)} </h3>
							<p>Giá mỗi đêm chưa gồm thuế và phí</p>
						</div>
					</div>
					<div
						className='hotel-detail-page__list-room__container__room__content__total'
						style={{ borderRight: "1px solid #ccc" }}
					>
						<div className='hotel-detail-page__list-room__container__room__content__total__item'>
							{data?.number}
						</div>
					</div>
					{checkView ? (
						""
					) : (
						<div className='hotel-detail-page__list-room__container__room__content__action'>
							<button onClick={() => linkToChekout(data)}>
								Đặt ngay
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default RoomItem;
