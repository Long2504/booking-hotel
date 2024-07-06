//libs
import { Footer } from "antd/es/layout/layout";
function FooterClient() {
	return (
		<Footer className='footer-client'>
			<div className='footer-client__content'>
				<div className='footer-client__content__contact'>
					<h4>Trợ giúp</h4>
					<div>Trung tâm trợ giúp</div>
					<div>Câu hỏi thường gặp</div>
					<div>Chính sách Bảo mật</div>
					<div>Chính sách về cookie</div>
					<div>Điều khoản sử dụng</div>
				</div>
				<div className='footer-client__content__about'>
					<h4>Công ty</h4>
					<p>Về chúng tôi</p>
					<p>Tuyển dụng</p>
					<p>Báo chí</p>
					<p>Nhật ký mạng</p>
				</div>
				<div className='footer-client__content__learn'>
					<h4>Điểm du lịch</h4>
					<p>Thành phố</p>
				</div>
				<div className='footer-client__content__category'>
					<h4>Đối tác của chúng tôi</h4>
					<p>Cổng thông tin đối tác YCS</p>
					<p>Partner Hub</p>
					<p>Quảng cáo trên website</p>
					<p>Đối tác liên kết</p>
					<p>Đối tác kết nối</p>
				</div>
				<div className='footer-client__content__category'>
					<h4>Tải ứng dụng</h4>
					<p>Ứng dụng iOS</p>
					<p>Ứng dụng Android</p>
				</div>
			</div>
		</Footer>
	);
}

export default FooterClient;
