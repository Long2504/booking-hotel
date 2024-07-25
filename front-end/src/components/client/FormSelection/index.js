//files
import Calendar from "../common/Calendar.client";
import RoomSelect from "../common/RoomSelect.client";
import Box from "../../common/box.core";
import ButtonCore from "../../common/button.core";
import { setFilterHotel } from "../../../redux/slice/hotelSlice.redux";

//libs
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

//icons
import { IoHomeOutline, IoSearch } from "react-icons/io5";

function FormSelection() {
	const { filter } = useSelector((state) => state.hotel);
	const [focus, setFocus] = useState(false);
	const [valueDate, setValueDate] = useState([
		dayjs(filter.startDate),
		dayjs(filter.endDate),
	]);
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState(filter.searchQuery);
	const [roomNumber, setRoomNumber] = useState(filter.roomNumber);
	const [peopleNumber, setPeopleNumber] = useState(filter.peopleNumber);
	const dispatch = useDispatch();

	const styleFocus = {
		backgroundColor: focus ? "rgba(0,0,0,0.7)" : "transparent",
		display: focus ? "block" : "none",
	};
	const onChangeSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = () => {
		const startDate = valueDate[0].format("YYYY-MM-DD"); 
		const endDate = valueDate[1].format("YYYY-MM-DD");
		dispatch(
			setFilterHotel({
				...filter,
				searchQuery,
				startDate,
				endDate,
				roomNumber,
				peopleNumber,
			})
		);

		setFocus(false);
		navigate("/hotel");
	};
	return (
		<div className="form-selection">
			<div className="form-selection__main" style={styleFocus}></div>
			<img
				className="form-selection__background-img"
				src="https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png"
				alt=""
			/>
			<Box radius={7} className="form-selection__header">
				<Space className="form-selection__header__content">
					<IoHomeOutline />
					<p>HÃY CHO CHÚNG TÔI BIẾT MONG MUỐN CỦA BẠN</p>
				</Space>
			</Box>

			<Box radius={5} className="form-selection__form">
				<Box radius={5} border className="form-selection__form__top">
					<IoSearch style={{ color: "#555", fontSize: "20px" }} />
					<input
						value={searchQuery}
						onChange={onChangeSearch}
						onFocus={() => {
							setFocus(true);
						}}
						onBlur={() => {
							setFocus(false);
						}}
						type="search"
						placeholder="Nhập địa điểm du lịch hoặc tên khách sạn"
					/>
				</Box>

				<div className="form-selection__form__center">
					<div className="form-selection__form__center__calendar">
						<Calendar
							setFocus={setFocus}
							value={valueDate}
							setValue={setValueDate}
						/>
					</div>
					<Box
						className="form-selection__form__center__room"
						border
						radius={5}
					>
						<RoomSelect
							setFocus={setFocus}
							people={peopleNumber}
							setPeople={setPeopleNumber}
							room={roomNumber}
							setRoom={setRoomNumber}
						/>
					</Box>
				</div>
				<div className="form-selection__form__bottom">
					<ButtonCore type="primary" onClick={handleSubmit}>
						TÌM
					</ButtonCore>
				</div>
			</Box>
		</div>
	);
}

export default FormSelection;
