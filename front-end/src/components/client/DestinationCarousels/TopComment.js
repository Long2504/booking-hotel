//files
import Box from "../../core/box.core";

//libs
import { Space } from "antd";


function TopComment() {
	return (
		<div className='top-comments-landing'>
			<div className='top-comments-landing__header'>
				Tiếng lành đồn xa
			</div>

			<Space className='top-comments-landing__content'>
				<Box radius={5} border className='top-comments-landing__content__review'>
					<h1>Ruby Can Tho Hotel</h1>
					<p>tại Cần Thơ</p>
					<h2>
						"Tôi hoàn toàn hài lòng khi nghỉ tại Ruby Can Tho Hotel.
						Cám ơn hệ thống của các bạn rất nhiều."
					</h2>
					<p>-Nguyễn Văn A</p>
				</Box>

				<Box radius={5} border className='top-comments-landing__content__review'>
					<h1>InterContinental Nha Trang</h1>
					<p>in Nha Trang</p>
					<h2>
						"Tôi hoàn toàn hài lòng khi nghỉ tại InterContinental
						Nha Trang. Cám ơn hệ thống của các bạn rất nhiều."
					</h2>
					<p>-Nguyễn Văn B</p>
				</Box>

				<Box radius={5} border className='top-comments-landing__content__review'>
					<h1>Hanoi Era Hotel</h1>
					<p>in Hà Nội</p>
					<h2>
						"Tôi hoàn toàn hài lòng khi nghỉ tại Hanoi Era Hotel.
						Cám ơn hệ thống của các bạn rất nhiều."
					</h2>
					<p>-Nguyễn Văn C</p>
				</Box>
			</Space>
		</div>
	);
}

export default TopComment;
