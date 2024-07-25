// files
import { vietNamDong } from "../../utils/common.utils";
import RoomItem from "../../components/client/HotelDetail/RoomItem";
import ExtensionItem from "../../components/client/HotelDetail/ExtensionItem";
import ScrollUpNav from "../../components/client/common/ScrollUpNav.client";
import ImageCore from "../../components/common/image.core";
import Box from "../../components/common/box.core";
import hotelApi from "../../services/modules/hotel.service";
import { setInfoOrder } from "../../utils/localStorage.utils";

// libs
import { Space, Divider, Rate, Col, Row, Image, Tabs, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

//icons
import { FaCheck, FaCamera } from "react-icons/fa";

function HotelDetailPage() {
	const { filter } = useSelector((state) => state.hotel);
	const [hotel, setHotel] = useState({});
	const navigate = useNavigate();
	const [scroll, setScroll] = useState(0);
	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			setScroll(window.scrollY);
		});
	});
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		(async () => {
			try {
				setSearchParams({
					startDate: filter.startDate,
					endDate: filter.endDate,
					roomNumber: filter.peopleNumber,
					peopleNumber: filter.peopleNumber,
				});
				const param = {
					startDate:
						searchParams.get("startDate") || filter.startDate,
					endDate: searchParams.get("endDate") || filter.endDate,
					roomNumber:
						searchParams.get("roomNumber") || filter.roomNumber,
					peopleNumber:
						searchParams.get("peopleNumber") || filter.peopleNumber,
				};
				const { metaData } = await hotelApi.getById(id, param);
				setHotel(metaData);
			} catch (error) {}
		})();
	}, [id, searchParams, filter, setSearchParams]);

	const linkToCheckout = (room) => {
		const data = {
			hotel: {
				id: hotel.id,
				name: hotel.name,
				address: hotel.address,
				star: hotel?.star,
				images: hotel?.images,
			},
			room: room,
			checkInDate: filter.startDate,
			checkOutDate: filter.endDate,
			totalDays: dayjs(filter.endDate).diff(
				dayjs(filter.startDate),
				"day"
			),
		};
		setInfoOrder(data);
		navigate(`/checkout/${id}`);
	};

	const itemTabs = [
		{
			label: "Tổng quan".toUpperCase(),
			key: "1",
		},
		{
			label: "Phòng nghỉ".toUpperCase(),
			key: "2",
		},
		{
			label: "Tiện nghi".toUpperCase(),
			key: "3",
		},
	];

	const styleScrollUpNav = {
		position: "fixed",
		top: 50,
		zIndex: 10,
		left: 0,
		right: 0,
		width: "100%",
		backgroundColor: "white",
		boxShawdow: "0 3px 6px 0 #0000004d",
		padding: "0 20%",
		border: "none",
		borderBottom: "1px solid #ccc",
	};
	const [clicked, setClicked] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleScrollUp = (key) => {
		const ids = {
			1: "hotel-detail-page",
			2: "hotel-detail-page__list-room",
			3: "hotel-detail-page__extension",
		};

		const element = document.getElementById(ids[key]);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<ScrollUpNav
				calcScroll="150"
				handleClicking={() => setClicked(!clicked)}
			/>
			<div className="hotel-detail-page" id="hotel-detail-page">
				<div className="hotel-detail-page__img">
					<div className="hotel-detail-page__img__main">
						<ImageCore
							src={hotel?.images?.length > 0 && hotel.images[1]}
						/>
						<button
							className="hotel-detail-page__img__main__btn"
							onClick={() => setIsModalOpen(true)}
						>
							<FaCamera />
							<p>Xem mọi bức ảnh</p>
						</button>
					</div>
					<Row
						className="hotel-detail-page__img__list-sub"
						gutter={[8, 8]}
					>
						{hotel?.images?.slice(1, 7)?.map((url, index) => {
							return (
								<Col
									key={index}
									span={8}
									className="hotel-detail-page__img__list-sub__child"
								>
									<ImageCore src={url} />
								</Col>
							);
						})}
					</Row>
				</div>

				<div
					className="hotel-detail-page__tab"
					style={scroll > 150 ? styleScrollUpNav : {}}
				>
					<Tabs
						items={itemTabs}
						defaultActiveKey="1"
						tabBarStyle={{
							borderBottom: "none",
							height: "100%",
							margin: 0,
						}}
						style={{ height: "100%" }}
						onChange={handleScrollUp}
					/>

					<Space className="hotel-detail-page__tab__price">
						<p className="hotel-detail-page__tab__price__title">
							Từ
						</p>
						<p className="hotel-detail-page__tab__price__price">
							{vietNamDong(hotel?.priceAverage)}
						</p>
					</Space>
				</div>

				<div className="hotel-detail-page__content">
					<Box
						border
						radius={4}
						className="hotel-detail-page__content__top"
					>
						<div className="hotel-detail-page__content__top__title">
							<h1>{hotel?.name}</h1>
							<Rate value={hotel?.star || 0} disabled />
						</div>
						<Space className="hotel-detail-page__content__top__address">
							<span>{hotel?.address}</span>
							<span style={{ color: "#488bf8" }}>
								- TRÊN BẢN ĐỒ
							</span>
						</Space>
						<Divider style={{ margin: "0" }} />
						<p className="hotel-detail-page__content__top__desc">
							{hotel?.description}
						</p>
					</Box>
					<Box
						border
						radius={4}
						className="hotel-detail-page__content__center"
					>
						<h2>Tiện nghi</h2>
						<Row gutter={[16, 24]}>
							<Col
								span={6}
								className="hotel-detail-page__content__center__grid-item"
							>
								<FaCheck />
								<span>Đưa đón sân bay</span>
							</Col>
							<Col
								span={6}
								className="hotel-detail-page__content__center__grid-item"
							>
								<FaCheck />
								<span>CLB trẻ em</span>
							</Col>
							<Col
								span={6}
								className="hotel-detail-page__content__center__grid-item"
							>
								<FaCheck />
								<span>Bãi đỗ xe có nhân viên</span>
							</Col>
							<Col
								className="hotel-detail-page__content__center__grid-item"
								span={6}
							>
								<FaCheck />
								<span>Nhận/trả phòng [nhanh]</span>
							</Col>
							<Col
								className="hotel-detail-page__content__center__grid-item"
								span={6}
							>
								<FaCheck />
								<span>
									Wi-Fi miễn phí trong tất cả các phòng!
								</span>
							</Col>
							<Col
								className="hotel-detail-page__content__center__grid-item"
								span={6}
							>
								<FaCheck />
								<span>Tiện nghi nấu nướng ngoài trời</span>
							</Col>
							<Col
								className="hotel-detail-page__content__center__grid-item"
								span={6}
							>
								<FaCheck />
								<span>Bàn tiếp tân [24 giờ]</span>
							</Col>
							<Col
								className="hotel-detail-page__content__center__grid-item"
								span={6}
							>
								<FaCheck />
								<span>Bể bơi [ngoài trời]</span>
							</Col>
						</Row>
					</Box>
				</div>

				<div
					className="hotel-detail-page__list-room"
					id="hotel-detail-page__list-room"
				>
					<h2>Phòng còn trống tại {hotel?.name}</h2>
					<div className="hotel-detail-page__list-room__container">
						{hotel?.hotelRooms?.map((room, index) => (
							<RoomItem
								key={index}
								data={room}
								linkToCheckout={linkToCheckout}
							/>
						))}
					</div>
				</div>

				<Box
					radius={5}
					className="hotel-detail-page__extension"
					id="hotel-detail-page__extension"
				>
					<h2>Tiện nghi và cơ sở vật chất</h2>
					<div className="hotel-detail-page__extension__list">
						{hotel?.hotelExtensions?.map((extension, index) => (
							<ExtensionItem key={index} data={extension} />
						))}
					</div>
				</Box>
			</div>
			<Modal
				open={isModalOpen}
				onOk={() => setIsModalOpen(false)}
				onCancel={() => setIsModalOpen(false)}
				className="hotel-detail-page__modal"
				closeIcon={null}
				footer={null}
				width={"100%"}
			>
				<div className="hotel-detail-page__modal__image">
					<Row gutter={[8, 8]}>
						{hotel?.images?.map((url, index) => (
							<Col key={index} span={8}>
								<Image
									src={url}
									width={"100%"}
									height={"100%"}
								/>
							</Col>
						))}
					</Row>
				</div>
			</Modal>
		</>
	);
}

export default HotelDetailPage;
