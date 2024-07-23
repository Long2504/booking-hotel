import config from "../configs/config.js";
import { createTransport } from "nodemailer";
import { BadRequestError } from "../utils/error.response.js";
import { vietNamDong } from "../utils/index.utils.js";
const { app } = config;

const { emailServer, passEmailServer } = app;
class EmailService {
	async sendEmail(data) {
		try {
            const { email, subject, mailContent } = data;
            if(!email) throw new BadRequestError("Email not found");
			// create reusable transporter object using the default SMTP transport
			const transporter = createTransport({
				service: "gmail",
				auth: {
					user: emailServer,
					pass: passEmailServer,
				},
			});

			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: emailServer, // sender address
				to: email, // list of receivers
				subject: subject, // Subject line
				html: mailContent, // html body
			});

			// send mail
			await transporter.sendMail(info);
			return true;
		} catch (error) {
			console.log("🚀 ~ file: email.service.js:31 ~ error:");
			throw new BadRequestError(error);
		}
	}

	contentMailBooking(data) {
		const {
			customerName,
			checkInDate,
			checkOutDate,
			bookingDate,
			roomNum,
			roomName,
			hotelName,
			hotelAddress,
			totalPrice,
		} = data;
		return `<div style="background-color: white; display: flex; align-items: center; justify-content: center;">
  <table style="align-items: center; width: 900px; ">
      <tbody>
          <tr style="background-color: white;">
              <td style="padding:0 0 0 0; width: 900px;">
                  <table style="align-items: center; border: 0; width: 900px;">
                      <tbody>
                          <tr style="background-color: white;">
                              <td style="padding:0 44px 0 44px">
                                  <p
                                      style="font-weight:500;font-size:16px;color:#3c4043;letter-spacing:-0.02px;line-height:24px">
                                      Xin chào ${customerName},
                                  </p>
                                  <p
                                      style="font-weight:500;font-size:16px;color:#3c4043;letter-spacing:-0.02px;line-height:24px">
                                      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
                                      <br>
                                  </p>
                                  <h1 style="color: rgb(126, 126, 45);">Đặt phòng của bạn đã được xác nhận và hoàn
                                      tất</h1>
                                  <p>Bạn đã đặt phòng tại ${hotelName}</p>
                                  <p>Địa chỉ tại ${hotelAddress}</p>
                                  <p>Thời gian đặt phòng: ${bookingDate} </p>
                                  <p>Thời gian từ ${checkInDate} đến ${checkOutDate}</p>
                                  <p> ${roomNum} x ${roomName}</p>
                                  <p>Tổng số tiền đơn: ${vietNamDong(
										totalPrice
									)} </p>
                                  <p
                                      style="font-weight:500;font-size:16px;color:rgb(83, 146, 249);letter-spacing:-0.02px;line-height:24px">
                                      Vui lòng nhận phòng sau 12pm ngày đặt đầu tiên và trả phòng trước 12am ngày
                                      đặt cuối cùng
                                  </p>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
      </tbody>
  </table>
</div>`;
	}
}

export default new EmailService();
