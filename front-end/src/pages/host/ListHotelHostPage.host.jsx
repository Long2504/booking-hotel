import React, { useState } from "react";
import { Anchor, Space } from "antd";
import { Link } from "react-router-dom";
import ListHotelUnfinished from "../../components/host/hotel/ListHotelUnFinished";
import ListHotelFinished from "../../components/host/hotel/ListHotelFinished";
import ButtonCore from "../../components/common/button.core";
import Box from "../../components/common/box.core";

function ListHotelHostPage() {
	const [keyAnchor, setKeyAnchor] = useState({
		title: "",
		href: "#listings/unfinished",
	});
	const handleRender = () => {
		switch (keyAnchor?.href) {
			case "#listings/unfinished":
				return <ListHotelUnfinished />;
			case "#listings/finished":
				return <ListHotelFinished />;
			default:
				break;
		}
	};
	return (
		<Space direction='vertical' className='list-hotel-host'>
			<Space className='list-hotel-host__header'>
				<Anchor
					className='list-hotel-host__header__anchor'
					onClick={(e, link) => {
						e.preventDefault();
						setKeyAnchor(link);
					}}
					direction='horizontal'
					getCurrentAnchor={() => keyAnchor.href}
				>
					<Anchor.Link
						className='list-hotel-host__header__anchor__link'
						href='#listings/unfinished'
						title='Chưa hoàn thành'
					/>
					<Anchor.Link
						className='list-hotel-host__header__anchor__link'
						href='#listings/finished'
						title='Đang hoạt động'
					/>
				</Anchor>
				<ButtonCore type='primary'>
					<Link to='/host/listings/create'>Thêm một chỗ ở </Link>
				</ButtonCore>
			</Space>
			<p>
				Chọn các chỗ nghỉ để đăng tải một khi đã sẵn sàng.Tìm hiểu thêm
			</p>
			<Box radius={5} className='list-hotel-host__content'>
				{handleRender()}
			</Box>
		</Space>
	);
}
export default ListHotelHostPage;
