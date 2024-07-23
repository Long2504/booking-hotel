//files
import { extensionHotelHost } from "../../../../assets/images/index.image";
import ExtensionItem from "./ExtensionItem";
import extensionApi from "../../../../services/modules/extension.service";
import { handleError } from "../../../../utils/common.utils";

//libs
import { Space, Pagination, message } from "antd";
import { useEffect, useState } from "react";

function ExtensionHotel({ errors, setValue }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [listExtension, setListExtension] = useState([]);
	const [totalPage, setTotalPage] = useState(0);
	const [messageApi, contextHolder] = message.useMessage();
	const [selectedExtensions, setSelectedExtensions] = useState([]);
	useEffect(() => {
		if (selectedExtensions.length > 0) {
			setValue("extension", selectedExtensions);
		}
		(async () => {
			try {
				const params = {
					page: 1,
					pageSize: 7,
				};
				const {
					metaData: { list, total },
				} = await extensionApi.getList(params);
				setListExtension(list);
				setTotalPage(total);
			} catch (error) {
				const { errorMessage } = handleError(error);
				messageApi.error(errorMessage);
			}
		})();
	}, [selectedExtensions, setValue, messageApi]);
	const handleExtensionSelect = (data, extensionId) => {
		setSelectedExtensions((prevState) => ({
			...prevState,
			[extensionId]: data,
		}));
		setValue("extension", selectedExtensions);
	};
	return (
		<Space direction="vertical" className="extension-hotel-host">
			{contextHolder}
			<div className="extension-hotel-host__title">
				<Space direction="vertical">
					<h1>
						Tất cả các tiện nghi và những vật dụng nhỏ bạn cung cấp.
					</h1>
					<p>Nhà bạn có sẵn những vật dụng và tiện nghi gì?</p>
				</Space>
				<img src={extensionHotelHost} alt="" />
			</div>
			<Space
				direction="vertical"
				className="extension-hotel-host__content"
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
