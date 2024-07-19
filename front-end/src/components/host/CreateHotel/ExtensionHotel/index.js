import { Space, Pagination } from "antd";
import { useEffect, useState } from "react";
import listExtensionHost from "../../../../data/listExtensionHost.data";
import { extensionHotelHost } from "../../../../assets/images/index.image";
import ExtensionItem from "./ExtensionItem";
function ExtensionHotel({ errors, setValue }) {
	const [currentPage, setCurrentPage] = useState(1);
	const listExtension = listExtensionHost;
	const totalPage = 30;
	const a = {
		"4b749464-a028-4eac-b9f4-4a5fe2289e6f": [
			"061c8c5a-12a1-4e86-b91b-78077abe03f4",
			"2a8fd76d-8392-495d-bf95-a0e967cf6f04",
		],
		"48bc0c63-b555-43c4-b613-e7b145e8609c": [
			"12cffb45-1b3a-4be6-9311-1adbef43b230",
			"dd835a4b-f9c6-43a7-8397-88e4d3444e50",
		],
		"1dd0665c-e938-4ce9-9e49-efbb2311d42d": [
			"0aa72698-f033-4dbb-8e38-dc78f18d58dc",
		],
	};
	const [selectedExtensions, setSelectedExtensions] = useState(a);
	useEffect(() => {
		setValue("extension", selectedExtensions);
	})
	const handleExtensionSelect = (data, extensionId) => {
		setSelectedExtensions((prevState) => ({
			...prevState,
			[extensionId]: data,
		}));
		setValue("extension", selectedExtensions);
	};
	return (
		<Space direction='vertical' className='extension-hotel-host'>
			<div className='extension-hotel-host__title'>
				<Space direction='vertical'>
					<h1>
						Tất cả các tiện nghi và những vật dụng nhỏ bạn cung cấp.
					</h1>
					<p>Nhà bạn có sẵn những vật dụng và tiện nghi gì?</p>
				</Space>
				<img src={extensionHotelHost} alt='' />
			</div>
			<Space
				direction='vertical'
				className='extension-hotel-host__content'
			>
				{listExtension?.map((item) => {
					return (
						<ExtensionItem
							key={item.id}
							data={item}
							listSubExtension={selectedExtensions[item.id]}
							handleExtensionSelect={handleExtensionSelect}
						/>
					);
				})}
			</Space>
			<Pagination
				style={{ textAlign: "center", marginTop: "20px" }}
				current={currentPage}
				total={totalPage}
				onChange={(page) => setCurrentPage(page)}
			/>
		</Space>
	);
}

export default ExtensionHotel;
