import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Calendar } from "../FormSelection/Calendar";
import RoomSelect from "../FormSelection/RoomSelect";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilterHotel } from "../../../../redux/slice/hotelSlice.host";
import { useSearchParams } from "react-router-dom";

function ScrollUpNav({ calcScroll, handleClicking }){
	const [scroll, setScroll] = useState(0);
	const [focus, setFocus] = useState(false);

	const { filter } = useSelector((state) => state.hotelHost);
	const dispatch = useDispatch();
	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			setScroll(window.scrollY);
		});
	});
	const [searchParams] = useSearchParams();

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
					prefix={<SearchIcon />}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					value={
						filter.searchQuery || searchParams.get("searchQuery")
					}
					onChange={(e) =>
						dispatch(
							setFilterHotel({ searchQuery: e.target.value })
						)
					}
				/>

				<div className='scroll-up-nav__content__calendar'>
					<Calendar setFocus={setFocus} filter={filter} />
				</div>
				<div className='scroll-up-nav__content__room-select'>
					<RoomSelect filterNumber={filter} setFocus={setFocus} />
				</div>
			</div>
		</div>
	);
};
