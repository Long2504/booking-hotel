import React from "react";

import { Tabs } from "antd";
import HotelsHighlight from "./HotelsHighlight";

function TopHighlights() {
	const listHotel = [
		{
			id: "01732c67-8a5b-48b0-941d-2c36b9f1d663",
			name: "Khách sạn Sofitel Legend Metropole Hà Nội (Sofitel Legend Metropole Hanoi Hotel)",
			description:
				"Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí trung tâm tại Quận Hoàn Kiếm của Hà Nội, chỗ nghỉ này đặt quý khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 5 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, bể bơi ngoài trời và xông khô ngay trong khuôn viên.",
			star: 5,
			images: [
				"https://pix6.agoda.net/hotelImages/10964/-1/2f6c5e27ffe5d8d378140eccf9286b6c.jpg?ca=7&ce=1&ar=1x1&s=512x384",
				"https://pix6.agoda.net/hotelImages/10964/-1/2f6c5e27ffe5d8d378140eccf9286b6c.jpg?ca=7&ce=1&s=512x384",
			],
			isPost: true,
			address:
				"Số 15, Phố Ngô Quyền, Quận Hoàn Kiếm, Quận Hoàn Kiếm, Hà Nội, Việt Nam, 100000",
			priceAverage: 2367270,
		},
		{
			id: "02866e28-b3f4-47a6-8091-8a1b19be992d",
			name: "The Lapis Hotel",
			description:
				"Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí trung tâm tại Quận Hoàn Kiếm của Hà Nội, chỗ nghỉ này đặt quý khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 4.5 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng bể bơi trong nhà, bể bơi ngoài trời và xông khô ngay trong khuôn viên.",
			star: 4,
			images: [
				"https://pix6.agoda.net/hotelImages/1804917/-1/77506c3b238363a44e9935c7e4afd381.jpg?ce=0&ar=1x1&s=512x384",
				"https://pix6.agoda.net/hotelImages/1804917/-1/77506c3b238363a44e9935c7e4afd381.jpg?ce=0&s=512x384",
			],
			isPost: true,
			address:
				"21 Tran Hung Dao, Hoang Kiem,, Quận Hoàn Kiếm, Hà Nội, Việt Nam, 10000",
			priceAverage: 3796280,
		},
		{
			id: "09e6669a-b0fa-40d8-b713-b6132cc87184",
			name: "Golden Legend Diamond Hotel Hanoi",
			description:
				"Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí chiến lược tại Quận Hoàn Kiếm, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 3 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, nhà hàng và spa ngay trong khuôn viên.",
			star: 3,
			images: [
				"https://pix6.agoda.net/hotelImages/857490/-1/4958bd0f53f96f0462dad64acaea28c2.jpg?ca=0&ce=1&ar=1x1&s=512x384",
				"https://pix6.agoda.net/hotelImages/857490/-1/4958bd0f53f96f0462dad64acaea28c2.jpg?ca=0&ce=1&s=512x384",
			],
			isPost: true,
			address:
				"18 Chân Cầm,trung tâm phố cổ, Hoàn Kiếm, Hà Nội, Việt Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam, 100000",
			priceAverage: 2598750,
		},
		{
			id: "0a0d9c0d-b03e-4a0d-b7ed-cca76dcfe0f7",
			name: "Khách Sạn Hà Nội L'Heritage (Hanoi L'Heritage Hotel)",
			description:
				"Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí chiến lược tại Phố Cổ, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, phòng tập và spa ngay trong khuôn viên.",
			star: 4,
			images: [
				"https://pix8.agoda.net/hotelImages/920/920372/920372_15072817390033204270.jpg?ca=5&ce=1&s=512x384",
				"https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/413730933.jpg?k=0e5dde17d3422ac4fe7b16ddf798e6f5e01a52369141390c06ef855ab77a663a&o=",
			],
			isPost: true,
			address:
				"41 Hàng Gà, Hoan Kiem , Hanoi, Phố Cổ, Hà Nội, Việt Nam, 10000",
			priceAverage: 3462940,
		},
		{
			id: "0db347d3-6eb3-42a0-b999-2f9486621ac1",
			name: "Lotte Hotel Hanoi",
			description:
				"Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí trung tâm tại Ba Đình của Hà Nội, chỗ nghỉ này đặt quý khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 5 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng bể bơi trong nhà, mát-xa và bể bơi ngoài trời ngay trong khuôn viên.",
			star: 5,
			images: [
				"https://pix8.agoda.net/hotelimages/665815/3130446/53f5622c3384232bba23cfe0966ee15c.jpeg?ca=27&ce=0&s=512x384",
				"https://pix6.agoda.net/hotelImages/665815/-1/71f86c5cf90698ecbe9a0aeea9979aec.jpg?ca=27&ce=0&ar=1x1&s=512x384",
			],
			isPost: true,
			address: "54 Liễu Giai, Ba Đình, Hà Nội, Việt Nam, 10000",
			priceAverage: 2274680,
		},
		{
			id: "20d062d6-ef8e-4d68-9ce1-ef50bf3bb0dd",
			name: "Khách sạn Bespoke Trendy Hà Nội (trước đây là Khách sạn Trendy Hà Nội La Siesta) (Bespoke Trendy Hotel Hanoi (Formerly Hanoi La Siesta Hotel Trendy))",
			description:
				"Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí chiến lược tại Phố Cổ, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, xông khô và phòng xông ướt ngay trong khuôn viên.",
			star: 4,
			images: [
				"https://pix6.agoda.net/hotelImages/115/1158452/1158452_16061316220043496351.jpg?ca=6&ce=1&ar=1x1&s=512x384",
				"https://pix6.agoda.net/hotelImages/115/1158452/1158452_16061316220043496351.jpg?ca=6&ce=1&s=512x384",
			],
			isPost: true,
			address: "12 Nguyễn Quang Bích, Phố Cổ, Hà Nội, Việt Nam, 10000",
			priceAverage: 1981470,
		},
		{
			id: "272378ff-408d-4c26-bcf4-cfc413614a29",
			name: "Khách sạn HANZ Ami Central Hà Nội (HANZ Ami Central Hotel Hanoi)",
			description:
				"Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí chiến lược tại Phố Cổ, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 3 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa và nhà hàng ngay trong khuôn viên.",
			star: 3,
			images: [
				"https://pix8.agoda.net/hotelImages/223242/626645114/a9075eaf77281e1394194b9bf881dd23.jpg?ce=0&ar=1x1&s=512x384",
				"https://pix8.agoda.net/hotelImages/223242/626645114/a9075eaf77281e1394194b9bf881dd23.jpg?ce=0&s=512x384",
			],
			isPost: true,
			address:
				"30 Hàng Cót, Old Quarter, Hàng Mã, Hoàn Kiếm, Hanoi, Vietnam, Phố Cổ, Hà Nội, Việt Nam, 100000",
			priceAverage: 1858020,
		},
		{
			id: "2cfb4454-efaa-461d-9a89-6a73122126dc",
			name: "Khách sạn La Nueva Boutique Hà Nội (La Nueva Boutique Hotel Hanoi)",
			description:
				"Hãy để chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí chiến lược tại Quận Hoàn Kiếm, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Phố Cổ nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa và nhà hàng ngay trong khuôn viên.",
			star: 4,
			images: [
				"https://pix6.agoda.net/hotelImages/178114/-1/bcfa4e518a97e54a37cd2d32cbcc462f.jpg?ce=0&ar=1x1&s=512x384",
				"https://pix6.agoda.net/hotelImages/178114/-1/bcfa4e518a97e54a37cd2d32cbcc462f.jpg?ce=0&s=512x384",
				"https://pix6.agoda.net/hotelImages/178114/3227731/17af4e0a89416369d37ab7d0a710a72f.jpg?ce=0&s=512x384",
			],
			isPost: true,
			address:
				"30 - 32 Lò Sũ, Quận Hòan Kiếm , Quận Hoàn Kiếm, Hà Nội, Việt Nam, 100000",
			priceAverage: 2521590,
		},
	];

	const items = [
		{
			key: "1",
			label: "Hà Nội",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "2",
			label: "Đà Nẵng",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "3",
			label: "Vũng Tàu",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "4",
			label: "Đà Lạt",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "5",
			label: "Hồ Chí Minh",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
	];

	return (
		<div className='top-highlights-landing'>
			<div className='top-highlights-landing__header'>
				Những chỗ nghỉ nổi bật được đề xuất cho quý khách:
			</div>
			<Tabs
				items={items}
				className='top-highlights-landing__content'
				size='large'
			/>
		</div>
	);
}
export default TopHighlights;
