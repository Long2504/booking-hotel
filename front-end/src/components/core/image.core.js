import { Image } from "antd";

function ImageCore({ src, alt }) {
	return (
		<Image
			src={src}
			alt={alt || ""}
            width={"100%"}
            height={"100%"}
		/>
	);
}

export default ImageCore;