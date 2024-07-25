//files
import { vietNamDong } from "../../../utils/common.utils";
import Box from "../../common/box.core";
import { setFilterHotel } from "../../../redux/slice/hotelSlice.redux";

//libs
import { Divider, Checkbox, Slider, Rate } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//icons
import { IoSearch } from "react-icons/io5";

function DashboardLeft({ minMaxPrice }) {
	const { filter } = useSelector((state) => state.hotel);
	const dispatch = useDispatch();
	const [value, setValue] = useState(minMaxPrice);
	const dataStar = [
		{
			label: <Rate disabled defaultValue={5} />,
			value: 5,
		},
		{
			label: <Rate disabled defaultValue={4} />,
			value: 4,
		},
		{
			label: <Rate disabled defaultValue={3} />,
			value: 3,
		},
	];

	useEffect(() => {
		setValue(minMaxPrice);
	}, [minMaxPrice]);
	const onChangePrice = (newValue) => {
		setValue(newValue);
		dispatch(
			setFilterHotel({
				...filter,
				minimumPrice: newValue[0],
				maximumPrice: newValue[1],
			})
		);
	};
	const onChangeStar = (val) => {
		dispatch(setFilterHotel({ ...filter, multiStar: val }));
	};
	const renderCityFilter = () => {
		return [
			{
				label: "Hồ Chí Minh",
				value: "79",
			},
			{
				label: "Vũng Tàu",
				value: "77",
			},
			{
				label: "Đà Nẵng",
				value: "48",
			},

			{
				label: "Hà Nội",
				value: "01",
			},
			{
				label: "Đà Lạt",
				value: "672",
			},
			{
				label: "Nha Trang",
				value: "568",
			},
			{
				label: "Hạ Long",
				value: "193",
			},
			{
				label: "Huê",
				value: "474",
			},
			{
				label: "Quy Nhơn",
				value: "540",
			},
			{
				label: "Cần Thơ",
				value: "92",
			},
			{
				label: "Hội An",
				value: "503",
			},
		];
	};

	const onChangeMultiCity = (val) => {
		dispatch(setFilterHotel({ ...filter, multiCity: val }));
	};

	return (
		<div className="dashboard-left">
			<Box border={false} className="dashboard-left__map">
				<div className="dashboard-left__map__arrow">
					<img
						height="40px"
						src="https://cdn6.agoda.net/images/MAPS-1213/default/img-map-pin-red.svg"
						alt=""
					/>
				</div>
				<div>
					<img
						height=""
						src="https://cdn6.agoda.net/images/MAPS-1213/default/bkg-map-entry.svg"
						alt=""
					/>
				</div>

				<div className="dashboard-left__map__text">
					<p>Xem ví trí</p>
				</div>
			</Box>

			<Box radius={18} className="dashboard-left__search">
				<IoSearch className="dashboard-left__search__icon" />
				<input type="text" placeholder="Tìm kiếm" />
			</Box>

			<div className="dashboard-left__slider">
				<p className="dashboard-left__slider__title">Giá mỗi đêm</p>
				<Slider
					valueLabelDisplay="auto"
					range
					onChangeComplete={onChangePrice}
					min={minMaxPrice[0]}
					max={minMaxPrice[1]}
				/>
				<div className="dashboard-left__slider__bottom">
					<div style={{ width: "40%" }}>
						<p>Tối thiểu</p>
						<Box
							radius={5}
							className="dashboard-left__slider__bottom__value"
						>
							{vietNamDong(value[0])}
						</Box>
					</div>
					<div style={{ width: "40%" }}>
						<p>Tối đa</p>
						<Box
							radius={5}
							className="dashboard-left__slider__bottom__value"
						>
							{vietNamDong(value[1])}
						</Box>
					</div>
				</div>

				<Divider
					style={{
						borderBlockStart: "3px solid rgba(5, 5, 5, 0.06)",
					}}
				/>
				<div className="dashboard-left__slider__hotel-type">
					<p className="dashboard-left__slider__hotel-type__title">
						Xếp hạng sao
					</p>
					<Checkbox.Group
						options={dataStar}
						onChange={onChangeStar}
					/>
				</div>
				<Divider
					style={{
						borderBlockStart: "3px solid rgba(5, 5, 5, 0.06)",
					}}
				/>
				<div className="dashboard-left__slider__hotel-type">
					<p className="dashboard-left__slider__hotel-type__title">
						Khu vực
					</p>
					<Checkbox.Group
						options={renderCityFilter()}
						onChange={onChangeMultiCity}
						style={{ display: "flex", flexDirection: "column" }}
					/>
				</div>
			</div>
		</div>
	);
}
export default DashboardLeft;
