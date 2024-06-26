import React, { useState } from "react";
import { Calendar } from "./Calendar";
import RoomSelect from "./RoomSelect";
import { Link } from "react-router-dom";
import { Space } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
<HomeOutlined />;

export const FormSelection = () => {
	const [focus, setFocus] = useState(false);
	return (
		<div className='form-selection'>
			<div
				className='form-selection__main'
				style={{
					backgroundColor: focus ? "rgba(0,0,0,0.7)" : "transparent",
					display: focus ? "block" : "none",
				}}
			></div>
			<img
				className='form-selection__background-img'
				src='https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png'
				alt=''
			/>
			<div>
				<div className='form-selection__header'>
					<Space className='form-selection__header__content'>
						<HomeOutlined />
						<p>HÃY CHO CHÚNG TÔI BIẾT MONG MUỐN CỦA BẠN</p>
					</Space>
				</div>
			</div>
			<div
				className='form-selection__form'
			>
				<div className='form-selection__form__top'>
					<SearchOutlined style={{ color: "#555" }} />
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
				</div>

				<div className='form-selection__form__center'>
					<div className='form-selection__form__center__calendar'>
						<Calendar setFocus={setFocus} />
					</div>
					<div className='form-selection__form__center__room'>
						<RoomSelect setFocus={setFocus} />
					</div>
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
			</div>
		</div>
	);
};
