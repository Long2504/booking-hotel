//files
import HotelsHighlight from "./HotelsHighlight";
import { listHotelHighlight } from '../../../data/listHotelHighlight.data';

//libs
import { Tabs } from "antd";

function TopHighlights() {
	const listHotel = listHotelHighlight;

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
