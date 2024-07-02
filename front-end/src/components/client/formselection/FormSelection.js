//files
import Calendar from "../core/Calendar.client";
import RoomSelect from "../core/RoomSelect.client";
import Box from "../../core/box.core";

//libs
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";

//icons
import { IoHomeOutline, IoSearch } from "react-icons/io5";

function FormSelection() {
	const [focus, setFocus] = useState(false);
	const styleFocus = {
		backgroundColor: focus ? "rgba(0,0,0,0.7)" : "transparent",
		display: focus ? "block" : "none",
	};
	return (
		<div className='form-selection'>
			<div className='form-selection__main' style={styleFocus}></div>
			<img
				className='form-selection__background-img'
				src='https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png'
				alt=''
			/>
			<Box radius={7} className='form-selection__header'>
				<Space className='form-selection__header__content'>
					<IoHomeOutline />
					<p>HÃY CHO CHÚNG TÔI BIẾT MONG MUỐN CỦA BẠN</p>
				</Space>
			</Box>

			<Box className='form-selection__form'>
				<Box radius={5} border className='form-selection__form__top'>
					<IoSearch style={{ color: "#555" }} />
					<input
						onFocus={() => {
							setFocus(true);
						}}
						onBlur={() => {
							setFocus(false);
						}}
						type='search'
						placeholder='Nhập địa điểm du lịch hoặc tên khách sạn'
					/>
				</Box>

				<div className='form-selection__form__center'>
					<div className='form-selection__form__center__calendar'>
						<Calendar setFocus={setFocus} />
					</div>
					<Box border radius={5} className='form-selection__form__center__room'>
						<RoomSelect setFocus={setFocus} />
					</Box>
				</div>
				<div className='form-selection__form__bottom'>
					<Link
						className='form-selection__form__bottom__link'
						style={{ color: "#fff" }}
						to='/hotel'
					>
						<button>TÌM</button>
					</Link>
				</div>
			</Box>
		</div>
	);
}

export default FormSelection;
