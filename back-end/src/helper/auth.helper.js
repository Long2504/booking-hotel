import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/error.response.js";
import { EXPIRES_TOKEN } from "../middlewares/constant.middleware.js";

const createTokenPair = (payload, privateKey, publicKey) => {
	const accessToken = jwt.sign(payload, publicKey, {
		expiresIn: EXPIRES_TOKEN.ACCESS_TOKEN,
	});
	const refreshToken = jwt.sign(payload, privateKey, {
		expiresIn: EXPIRES_TOKEN.REFRESH_TOKEN,
	});
	return {
		accessToken,
		refreshToken,
	};
};

const createAccessToken = (payload, privateKey) => {
	return jwt.sign(payload, privateKey, {
		expiresIn: EXPIRES_TOKEN.ACCESS_TOKEN,
	});
};

const verifyToken = (token, keySecret) => {
	return jwt.verify(token, keySecret, function (err, decoded) {
		if (err) {
			if (err?.message === "jwt expired")
				throw new UnauthorizedError("Token expired");
			throw new UnauthorizedError("Invalid token");
		}
		return decoded;
	});
};

export { createTokenPair, verifyToken, createAccessToken };
