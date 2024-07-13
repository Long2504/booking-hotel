//files
import Box from "../../common/box.core";

//libs
import { Space, Checkbox, Col, Row } from "antd";

function ExtensionItem({ data, listConvenience }) {
	const idConvenience = data?.id;
	const convenience = listConvenience?.find(
		(item) => item?.id === idConvenience
	);
	const defaultCheckedValues = convenience?.subExtensions || [];
	return (
		<Space
			direction='vertical'
			className='extension-hotel-host__content__item'
		>
			<h2>{data?.name}</h2>
			{data?.description && <p>{data?.description}</p>}
			<Box className='extension-hotel-host__content__item__checkbox' radius={3}>
				<Checkbox.Group defaultValue={defaultCheckedValues}>
					<Row gutter={[15, 15]}>
						{data?.subExtensions.map((item, index) => {
							return (
								<Col key={index}>
									<Checkbox
										value={item.id}
										defaultChecked={true}
									>
										{item.name}
									</Checkbox>
								</Col>
							);
						})}
					</Row>
				</Checkbox.Group>
			</Box>
		</Space>
	);
}

export default ExtensionItem;
