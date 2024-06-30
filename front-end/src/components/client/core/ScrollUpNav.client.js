import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Calendar from "./Calendar.client";
import RoomSelect from "./RoomSelect.client";
import { Input } from "antd";

function ScrollUpNav({ calcScroll, handleClicking }) {
	const [scroll, setScroll] = useState(0);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			setScroll(window.scrollY);
		});
	});

	const styleScrollUpNav = {
		position: "fixed",
		top: 0,
		zIndex: 100,
	};

	return (
		<div className='scroll-up-nav'>
			<div
				className='scroll-up-nav__content'
				style={scroll > calcScroll ? styleScrollUpNav : {}}
			>
				<Input
					className='scroll-up-nav__content__search'
					typeof='Search'
					prefix={<SearchOutlined />}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>

				<div className='scroll-up-nav__content__calendar'>
					<Calendar setFocus={setFocus} />
				</div>
				<div className='scroll-up-nav__content__room-select'>
					<RoomSelect setFocus={setFocus} />
				</div>
			</div>
		</div>
	);
}

export default ScrollUpNav;
