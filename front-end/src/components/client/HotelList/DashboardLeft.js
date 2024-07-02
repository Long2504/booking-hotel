//files
import { vietNamDong } from "../../../utils/common.utils";
import Box from "../../core/box.core";

//libs
import { Divider, Checkbox, Slider, Rate } from "antd";
import { useState } from "react";

//icons
import { IoSearch } from "react-icons/io5";


function DashboardLeft() {
	const [value] = useState([0, 1000]);
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
	const renderCityFilter = () => {
		return [
			{
				label: "Hồ Chí Minh",
				value: 13170,
			},
			{
				label: "Vũng Tàu",
				value: 17190,
			},
			{
				label: "Đà Nẵng",
				value: 16440,
			},

			{
				label: "Hà Nội",
				value: 2758,
			},
			{
				label: "Đà Lạt",
				value: 15932,
			},
			{
				label: "Nha Trang",
				value: 2679,
			},
			{
				label: "Hạ Long",
				value: 17182,
			},
			{
				label: "Huê",
				value: 3738,
			},
			{
				label: "Quy Nhơn",
				value: 17242,
			},
			{
				label: "Cần Thơ",
				value: 16079,
			},
			{
				label: "Hội An",
				value: 16552,
			},
		];
	};
	return (
		<div className='dashboard-left'>
			<Box border={false} className='dashboard-left__map'>
				<div className='dashboard-left__map__arrow'>
					<img
						height='40px'
						src='https://cdn6.agoda.net/images/MAPS-1213/default/img-map-pin-red.svg'
						alt=''
					/>
				</div>
				<div>
					<img
						height=''
						src='https://cdn6.agoda.net/images/MAPS-1213/default/bkg-map-entry.svg'
						alt=''
					/>
				</div>

				<div className='dashboard-left__map__text'>
					<p>Xem ví trí</p>
				</div>
			</Box>

			<Box radius={18} className='dashboard-left__search'>
				<IoSearch
					className='dashboard-left__search__icon'
				/>
				<input type='text' placeholder='Tìm kiếm' />
			</Box>

			<div className='dashboard-left__slider'>
				<p className='dashboard-left__slider__title'>Giá mỗi đêm</p>
				<Slider valueLabelDisplay='auto' min={0} max={1000} range />
				<div className='dashboard-left__slider__bottom'>
					<div style={{ width: "40%" }}>
						<p>Tối thiểu</p>
						<Box radius={5} className='dashboard-left__slider__bottom__value'>
							{vietNamDong(value[0])}
						</Box>
					</div>
					<div style={{ width: "40%" }}>
						<p>Tối đa</p>
						<Box radius={5} className='dashboard-left__slider__bottom__value'>
							{vietNamDong(value[1])}
						</Box>
					</div>
				</div>

				<Divider
					style={{
						borderBlockStart: "3px solid rgba(5, 5, 5, 0.06)",
					}}
				/>
				<div className='dashboard-left__slider__hotel-type'>
					<p className='dashboard-left__slider__hotel-type__title'>
						Xếp hạng sao
					</p>
					<Checkbox.Group options={dataStar} />
				</div>
				<Divider
					style={{
						borderBlockStart: "3px solid rgba(5, 5, 5, 0.06)",
					}}
				/>
				<div className='dashboard-left__slider__hotel-type'>
					<p className='dashboard-left__slider__hotel-type__title'>
						Khu vực
					</p>
					<Checkbox.Group
						options={renderCityFilter()}
						style={{ display: "flex", flexDirection: "column" }}
					/>
				</div>
			</div>
		</div>
	);
}
export default DashboardLeft;
