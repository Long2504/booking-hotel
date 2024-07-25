//libs
import { Dropdown, Space } from "antd";
import { useState } from "react";

//icons
import { FaChevronDown } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

function RoomSelect({ setFocus, setPeople, setRoom, people, room }) {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (nextOpen, info) => {
		if (info.source === "trigger" || nextOpen) {
			setOpen(nextOpen);
			setFocus(nextOpen);
		}
	};

	const onChangePeople = (value) => {
		if (value > 1) {
			if (value < room) {
				setRoom(value);
			}
			setPeople(value);
		}
	};

	const onChangeRoom = (value) => {
		if (value > 0) {
			if (room === people) {
				setPeople(value);
			}
			setRoom(value);
		}
	};

	const items = [
		{
			key: "1",
			label: (
				<div className="room-selection__dropdown__item">
					<p>Phòng</p>
					<Space className="room-selection__dropdown__item__number">
						<FiMinusCircle
							className="room-selection__dropdown__item__number__icon"
							onClick={() => onChangeRoom(room - 1)}
						/>
						<div>{room}</div>
						<FiPlusCircle
							className="room-selection__dropdown__item__number__icon"
							onClick={() => onChangeRoom(room + 1)}
						/>
					</Space>
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div className="room-selection__dropdown__item">
					<p>Số lượng người</p>
					<Space className="room-selection__dropdown__item__number">
						<FiMinusCircle
							className="room-selection__dropdown__item__number__icon"
							onClick={() => onChangePeople(people - 1)}
						/>
						<div>{people}</div>
						<FiPlusCircle
							className="room-selection__dropdown__item__number__icon"
							onClick={() => onChangePeople(people + 1)}
						/>
					</Space>
				</div>
			),
		},
	];
	
	return (
		<div className="room-selection">
			<Dropdown
				menu={{ items }}
				overlayStyle={{ width: "280px" }}
				placement="bottomCenter"
				arrow={{ pointAtCenter: true }}
				className="room-selection__dropdown"
				trigger={["click"]}
				autoAdjustOverflow={true}
				onOpenChange={handleOpenChange}
				open={open}
			>
				<div>
					<Space className="room-selection__dropdown__title">
						<p>{room} phòng</p>
						<p style={{ color: "#999" }}>{people} người</p>
					</Space>
					<FaChevronDown />
				</div>
			</Dropdown>
		</div>
	);
}

export default RoomSelect;
