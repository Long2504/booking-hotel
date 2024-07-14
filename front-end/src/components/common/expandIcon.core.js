import { FaAngleRight } from "react-icons/fa6";

const expandIconTable = ({ expanded, record, onExpand }) => {
	return (
		<span
			onClick={(e) => {
				onExpand(record, e);
				e.stopPropagation();
			}}
		>
			<FaAngleRight
				className='expand-icon-table'
				style={{
					transform: expanded ? "rotate(90deg)" : "",
				}}
			/>
		</span>
	);
};

const expandIconCollapse = ({ isActive }) => {
	return (
        <FaAngleRight
            className="expand-icon-collapse"
			style={{
                transform: isActive ? "rotate(90deg)" : "", 
                fontSize: "20px",
			}}
		/>
	);
};

export { expandIconTable, expandIconCollapse };
