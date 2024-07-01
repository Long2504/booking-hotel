//files
import { vietNamDong } from "../../../utils/common.utils";

//libs
import { Space, Col, Row, Rate } from "antd";

//icons
import { EnvironmentTwoTone } from "@ant-design/icons";
function HotelsHighlight({ listHotel }) {
	return (
		<Row
			gutter={[16, 24]}
			className='top-highlights-landing__content__list'
		>
			{listHotel?.map((item, index) => (
				<Col className='gutter-row' span={6} key={index}>
					<div className='top-highlights-landing__content__list__item'>
						<img src={item.images[0]} alt='' />
						<Space
							direction='vertical'
							className='top-highlights-landing__content__list__item__info'
							size={3}
						>
							<p
								className='top-highlights-landing__content__list__item__info__name'
								title={item.name}
							>
								{item.name}
							</p>
							<Rate
								defaultValue={item.star}
								disabled
								style={{ fontSize: "16px" }}
							/>
							<div className='top-highlights-landing__content__list__item__info__address'>
								<EnvironmentTwoTone
									style={{
										fontSize: "36px ",
										marginRight: "5px",
									}}
								/>
								<span title={item.address}>{item.address}</span>
							</div>
							<p className='top-highlights-landing__content__list__item__info__note'>
								Giá mỗi đêm chưa gồm thuế và phí{" "}
							</p>
							<p className='top-highlights-landing__content__list__item__info__price'>
								{vietNamDong(item.priceAverage)}
							</p>
						</Space>
					</div>
				</Col>
			))}
		</Row>
	);
}

export default HotelsHighlight;
