//files
import { postHotelHost } from "../../../assets/images/index.image";
import Box from "../../common/box.core";

//libs
import { Space, Checkbox } from "antd";

function PostHotelHost() {
	return (
		<Space direction='vertical' className='post-hotel-host'>
			<Space direction='horizontal' className='post-hotel-host__title'>
				<Space direction='vertical'>
					<h1>Ký hợp đồng và bắt đầu nhận đặt phòng.</h1>
					<p>Chỉ cần một vài chi tiết nữa thôi!</p>
				</Space>
				<img
					src={postHotelHost}
					alt=''
					className='post-hotel-host__title__img'
				/>
			</Space>
			<Space direction='vertical' className='post-hotel-host__content'>
				<h2>
					Am hiểu luật lệ, quy định và các chính sách thuế tại địa
					phương.
				</h2>
				<Box radius={5} className='post-hotel-host__content__item'>
					<Space direction='vertical'>
						<p>
							Tìm hiểu về luật lệ và chính sách thuế tại địa
							phương là trách nhiệm của bạn.
						</p>
						<p>
							Tìm hiểu về luật lệ và chính sách thuế tại địa
							phương trước khi nhận đơn đặt phòng. Rất nhiều quốc
							gia và một số thành phố có ban hành luật pháp cụ thể
							về việc dùng nơi ở của bạn để cho thuê ngắn hạn, ở
							chung nhà và hoặc cho thuê chỗ ở chuyên nghiệp.
						</p>
						<p>
							Hoạt động trong khuôn khổ pháp luật của quốc gia nơi
							cư trú là trách nhiệm của bạn, bao gồm các loại giấy
							phép, giấy chứng nhận hoặc đăng ký cần có trước khi
							nhận đơn đặt phòng, cũng như trả thuế hiện hành áp
							dụng cho thu nhập từ các đơn đặt phòng này.
						</p>
					</Space>
				</Box>
				<h2>Chấp nhận các điều khoản và điều kiện</h2>
				<Box radius={5} className='post-hotel-host__content__item'>
					<Checkbox>
						<p>
							<a href='#' style={{ color: "#1174a6" }}>
								Các điều khoản và điều kiện chung
							</a>{" "}
							áp dụng cho tất cả chỗ nghỉ của quý đối tác được
							đăng qua mạng diện rộng của Agoda
						</p>
					</Checkbox>
				</Box>
				<p>
					Quý đối tác có thể hiệu chỉnh các thiết lập hủy bỏ và tình
					trạng phòng sẵn có của mình một khi triển khai
				</p>
			</Space>
		</Space>
	);
}
export default PostHotelHost;
