//libs
import { Image, Upload, Space } from "antd";
import { useEffect, useState } from "react";

//icons
import { IoMdAdd } from "react-icons/io";

function ImageItem({ title, description, urlList }) {
	const renderURL = urlList?.map((url) => {
		return {
			uid: url,
			name: url,
			status: "done",
			url: url,
		};
	});

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (renderURL?.length > 0) {
			setFileList(renderURL);
		}
	}, [urlList]);

	const handlePreview = async (file) => {
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};
	const handleChange = async ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: "none",
			}}
		>
			<IoMdAdd size={20} />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</button>
	);
	return (
		<Space direction='vertical' className='photo-hotel-host__content__item'>
			<h2>{title}</h2>
			<p>{description}</p>
			<Upload
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={(file) => {
					return false;
				}}
				accept='image/*'
			>
				{fileList?.length >= 8 ? null : uploadButton}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{
						display: "none",
					}}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) =>
							!visible && setPreviewImage(""),
					}}
					src={previewImage}
				/>
			)}
		</Space>
	);
}

export default ImageItem;
