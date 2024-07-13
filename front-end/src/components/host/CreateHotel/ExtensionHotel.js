import { Space, Pagination } from "antd";
import { useState } from "react";
import listExtensionHost from "../../../data/listExtensionHost.data";
import { extensionHotelHost } from "../../../assets/images/index.image";
import ExtensionItem from "./ExtensionItem";
function ExtensionHotel() {
	const [currenPage, setCurrentPage] = useState(1);
	const listExtension = listExtensionHost;
	const totalPage = 30;
	const hotel = {};

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
							listExtension={hotel?.convenience}
						/>
					);
				})}
			</Space>
			<Pagination
				style={{ textAlign: "center", marginTop: "20px" }}
				current={currenPage}
				total={totalPage}
				onChange={(page) => setCurrentPage(page)}
			/>
		</Space>
	);
}

export default ExtensionHotel;
