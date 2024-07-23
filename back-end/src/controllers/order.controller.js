import OrderService from "../services/order.service.js";
import { SuccessResponse } from "../utils/access.response.js";

class OrderController {
	static orderPaypal = async (req, res) => {
		new SuccessResponse({
			message: "orderPaypal success",
			metaData: await OrderService.orderPaypal(req.body),
		}).send(res);
	};

	static captureOrderPaypal = async (req, res) => {
		const { orderId } = req.params;
		new SuccessResponse({
			message: "captureOrderPaypal success",
			metaData: await OrderService.captureOrderPaypal(req.body, orderId),
		}).send(res);
	};
}

export default OrderController;
