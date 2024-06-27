import React from "react";
import { Carousel } from "antd";

function TopDestination() {
	const DataCity = [
		{
			code: 13170,
			name: "Hồ Chí Minh",
			urlImg: "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 17190,
			name: "Vũng Tàu",
			urlImg: "https://pix6.agoda.net/geo/city/17190/1_17190_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 16440,
			name: "Đà Nẵng",
			urlImg: "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 2758,
			name: "Hà Nội",
			urlImg: "https://pix6.agoda.net/geo/city/2758/065f4f2c9fa263611ab65239ecbeaff7.jpg?ce=0&s=345x345&ar=1x1",
		},
		{
			code: 15932,
			name: "Đà Lạt",
			urlImg: "https://pix6.agoda.net/geo/city/15932/1_15932_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 2679,
			name: "Nha Trang",
			urlImg: "https://pix6.agoda.net/geo/city/2679/1_2679_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 17182,
			name: "Hạ Long",
			urlImg: "https://pix6.agoda.net/geo/city/17182/1_17182_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 3738,
			name: "Huế",
			urlImg: "https://pix6.agoda.net/geo/city/3738/1_3738_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 17242,
			name: "Quy Nhơn",
			urlImg: "https://pix6.agoda.net/geo/city/17242/1_17242_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 16079,
			name: "Cần Thơ",
			urlImg: "https://pix6.agoda.net/geo/city/16079/1_16079_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
		{
			code: 16552,
			name: "Hội An",
			urlImg: "https://pix6.agoda.net/geo/city/16552/1_16552_02.jpg?ca=6&ce=1&s=345x345&ar=1x1",
		},
	];

	const handleNavigateHotel = (code) => {};
	return (
		<div className='top-destination-landing'>
			<div className='top-destination-landing__heading'>
				Các địa điểm thu hút nhất
			</div>
			<Carousel
				autoplay
				autoplaySpeed={3000}
				adaptiveHeight
				className='top-destination-landing__carousel'
			>
				<div className='top-destination-landing__carousel__list'>
					{DataCity.slice(0, 6).map((item, index) => (
						<div
							key={index}
							className='top-destination-landing__carousel__list__item'
							onClick={() => handleNavigateHotel(item.code)}
						>
							<img alt='' src={item.urlImg} />
							<h4>{item.name}</h4>
						</div>
					))}
				</div>
				<div className='top-destination-landing__carousel__list'>
					{DataCity.slice(5, 11).map((item, index) => (
						<div
							key={index}
							className='top-destination-landing__carousel__list__item'
							onClick={() => handleNavigateHotel(item.code)}
						>
							<img alt='' src={item.urlImg} />
							<h4>{item.name}</h4>
						</div>
					))}
				</div>
			</Carousel>
		</div>
	);
}

export default TopDestination;
