//files
import { fileToBase64, getBase64 } from "../../../../utils/common.utils";

//libs
import { Image, Upload, Space } from "antd";
import { useEffect, useState } from "react";

//icons
import { IoMdAdd } from "react-icons/io";


function ImageItem({ title, description, urlList, indexRoom, setValue }) {
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
	}, [urlList, renderURL]);


	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};

	const handleChange = async ({ fileList: newFileList }) => {
		setFileList(newFileList);
		const newFileListCustom = newFileList.map(async (file) => {
			console.log("🚀 ~ file: imageItem.js:44 ~ file:", file)
			if (!file.url && !file.preview) {
				return {
					base64: await fileToBase64(file.originFileObj),
					type: file.type,
					name: file.name,
				};
			}
			return file;
		});
		const fileListTemp = await Promise.all(newFileListCustom);
		console.log("🚀 ~ file: imageItem.js:55 ~ fileListTemp:", fileListTemp)
		if (indexRoom !== undefined) {
			setValue(`rooms.${indexRoom}.images`, fileListTemp);
		} else {
			setValue("images", fileListTemp);
		}
	};

	const uploadButton = (
		<button>
			<IoMdAdd size={20} />
			<p>Upload</p>
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
					crossOrigin='anonymous'
					alt='Preview'
					style={{ width: "100%" }}
					loading='lazy'
				/>
			)}
		</Space>
	);
}

export default ImageItem;
