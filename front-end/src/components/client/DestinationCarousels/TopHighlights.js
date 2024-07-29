//files
import HotelsHighlight from "./HotelsHighlight";
import hotelApi from "../../../services/modules/hotel.service";

//libs
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function TopHighlights() {
	const [codeCity, setCodeCity] = useState("01");
	const { filter } = useSelector((state) => state.hotel);

	const [listHotel, setListHotel] = useState([]);

	useEffect(() => {
		(async () => {
			const params = {
				page: 1,
				pageSize: 8,
				startDate: filter.startDate,
				endDate: filter.endDate,
				roomNumber: filter.roomNumber,
				peopleNumber: filter.peopleNumber,
				multiCity: [codeCity],
			};
			const {
				metaData: { list },
			} = await hotelApi.getList(params);
			setListHotel(list);
		})();
	}, [codeCity, filter]);

	const items = [
		{
			key: "01",
			label: "Hà Nội",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "48",
			label: "Đà Nẵng",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "77",
			label: "Vũng Tàu",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "672",
			label: "Đà Lạt",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
		{
			key: "79",
			label: "Hồ Chí Minh",
			children: <HotelsHighlight listHotel={listHotel} />,
		},
	];

	const onChangeTab = (key) => {
		setCodeCity(key);
	};

	return (
		<div className="top-highlights-landing">
			<div className="top-highlights-landing__header">
				Những chỗ nghỉ nổi bật được đề xuất cho quý khách:
			</div>
			<Tabs
				items={items}
				className="top-highlights-landing__content"
				size="large"
				onChange={onChangeTab}
			/>
		</div>
	);
}
export default TopHighlights;
