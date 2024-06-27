import { Dropdown, Space } from "antd";
import { useState } from "react";
import {
	DownOutlined,
	MinusCircleTwoTone,
	PlusCircleTwoTone,
} from "@ant-design/icons";

export default function RoomSelect({ setFocus }) {
	const [open, setOpen] = useState(false);
	const [people, setPeople] = useState(1);
	const [room, setRoom] = useState(1);

	const handleOpenChange = (nextOpen, info) => {
		if (info.source === "trigger" || nextOpen) {
			setOpen(nextOpen);
			setFocus(nextOpen);
		}
	};

	const items = [
		{
			key: "1",
			label: (
				<div className='room-selection__dropdown__item'>
					<p>Phòng</p>
					<Space className='room-selection__dropdown__item__number'>
						<MinusCircleTwoTone
							className='room-selection__dropdown__item__number__icon'
							onClick={() => setRoom(room - 1)}
						/>
						<div>{room}</div>
						<PlusCircleTwoTone
							className='room-selection__dropdown__item__number__icon'
							onClick={() => setRoom(room + 1)}
						/>
					</Space>
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div className='room-selection__dropdown__item'>
					<p>Số lượng người</p>
					<Space className='room-selection__dropdown__item__number'>
						<MinusCircleTwoTone
							className='room-selection__dropdown__item__number__icon'
							onClick={() => setPeople(people - 1)}
						/>
						<div>{people}</div>
						<PlusCircleTwoTone
							className='room-selection__dropdown__item__number__icon'
							onClick={() => setPeople(people + 1)}
						/>
					</Space>
				</div>
			),
		},
	];
	return (
		<div className='room-selection'>
			<Dropdown
				menu={{ items }}
				overlayStyle={{ width: "280px" }}
				placement='bottomCenter'
				arrow={{ pointAtCenter: true }}
				className='room-selection__dropdown'
				trigger={["click"]}
				autoAdjustOverflow={true}
				onOpenChange={handleOpenChange}
				open={open}
			>
				<div>
					<Space className='room-selection__dropdown__title'>
						<p>{room} phòng</p>
						<p style={{ color: "#999" }}>
							{people} người
						</p>
					</Space>
					<DownOutlined />
				</div>
			</Dropdown>
		</div>
	);
}
