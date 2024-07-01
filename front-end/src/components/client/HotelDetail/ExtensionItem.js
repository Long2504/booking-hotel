//icons
import { ToolOutlined } from "@ant-design/icons";

function ExtensionItem({ data }) {
	if (!data?.id) return;
	return (
		<div className='hotel-detail-page__extension__list__item'>
			<div style={{ display: "flex", alignItems: "center" }}>
				<ToolOutlined style={{ marginRight: "5px" }} />
				<p>{data?.name}</p>
			</div>
			<ul>
				{data.subConvenience.map((sub) => {
					if (!sub?.id) return null;
					return <li key={sub?.id}>{sub?.name}</li>;
				})}
			</ul>
		</div>
	);
}

export default ExtensionItem;
