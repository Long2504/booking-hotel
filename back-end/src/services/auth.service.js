import bcrypt from "bcryptjs";
import { Op, literal } from "sequelize";
import User from "../models/user.model.js";
import BaseService from "./base.service.js";
import KeyTokenService from "./keyToken.service.js";
import {
	createTokenPair,
	createAccessToken,
	verifyToken,
} from "../helper/auth.helper.js";
import { BadRequestError, UnauthorizedError } from "../utils/error.response.js";
import { getInfoData } from "../utils/index.utils.js";
import UserModel from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import config from "../configs/config.js";

const { app } = config;

const { randomBytes } = await import("node:crypto");

const attributesUser = [
	"id",
	"email",
	"firstName",
	"lastName",
	"displayName",
	"avatarUrl",
	"phone",
	"address",
	"photoUrl",
	"description",
];

class AuthService extends BaseService {
	async signUp({ email, password }) {
		/*
        1- check email exists
        2- hash password
        3- create user
        4- create key token, refresh token, access token
        5- return data
     */
		//1
		const holder = await this.get({ where: { email } });
		if (holder) {
			throw new BadRequestError("Email already exists");
		}
		//2
		const passwordHash = await bcrypt.hash(password, 10);
		//3
		const newUser = await this.create({
			email,
			password: passwordHash,
		});
		//4
		if (newUser) {
			const privateKey = randomBytes(64).toString("hex");
			const publicKey = randomBytes(64).toString("hex");
			const userId = newUser.id;
			const tokens = createTokenPair(
				{
					userId,
					email: newUser.email,
				},
				privateKey,
				publicKey
			);
			const keyStores = await KeyTokenService.createKeyToken({
				userId,
				privateKey,
				publicKey,
				refreshToken: tokens.refreshToken,
			});

			if (!keyStores) {
				throw new Error("Failed to create key token");
			}

			//5
			return {
				code: 2001,
				message: "User created successfully",
				data: {
					user: getInfoData({
						fields: attributesUser,
						object: newUser,
					}),
					tokens,
				},
			};
		}
		throw new Error("Failed to create user");
	}

	async signIn({ email, password }) {
		/*
        1- check email exists
        2- check password
        3- create token( refreshToken, accessToken)
        4- create or update key token
        5- get data return
     */

		//1
		const holder = await this.model.findOne({ where: { email } });
		if (!holder) {
			throw new BadRequestError("Email not found");
		}
		//2
		const isMatch = await bcrypt.compare(password, holder.password);
		if (!isMatch) {
			throw new UnauthorizedError("Wrong password");
		}
		//3
		const userId = holder.id;
		const privateKey = randomBytes(64).toString("hex");
		const publicKey = randomBytes(64).toString("hex");
		const tokens = createTokenPair(
			{
				userId,
				email: holder.email,
			},
			privateKey,
			publicKey
		);
		//4
		await KeyTokenService.createKeyToken({
			userId,
			privateKey,
			publicKey,
			refreshToken: tokens.refreshToken,
		});

		return {
			code: 2000,
			message: "User login successfully",
			data: {
				user: getInfoData({
					fields: attributesUser,
					object: holder,
				}),
				tokens,
			},
		};
	}

	async signInByGoogle({ tokenId }) {
		/*
        1- check tokenId
        2- init client
        3- verify tokenId
        4- get payload
        5- check user and create if not exists
        6- create token( refreshToken, accessToken)
        7- create or update key token
        8- get data return
     */

		//1
		if (!tokenId) {
			throw new BadRequestError("Token not found");
		}

		//2
		const client = new OAuth2Client(app.clientId);

		//3
		const ticket = await client.verifyIdToken({
			idToken: tokenId,
			audience: app.clientId,
		});

		if (!ticket) {
			throw new BadRequestError("Token not verified");
		}

		//4
		const payload = ticket.getPayload();

		//5
		const holder = await this.model.findOne({
			where: { email: payload.email },
		});

		let newUser;
		if (!holder) {
			const user = {
				email: payload.email,
				oauthProvider: "google",
				oauthId: payload.sub,
				displayName: payload.name,
				firstName: payload.given_name,
				lastName: payload.family_name,
				avatarUrl: payload.picture,
			};
			newUser = await this.create(user);
			if (!newUser) {
				throw new Error("Failed to create user");
			}
		}

		if (!newUser) {
			newUser = holder;
		}

		//6
		const userId = newUser.id;
		const privateKey = randomBytes(64).toString("hex");
		const publicKey = randomBytes(64).toString("hex");
		const tokens = createTokenPair(
			{
				userId,
				email: newUser.email,
			},
			privateKey,
			publicKey
		);

		//7
		await KeyTokenService.createKeyToken({
			userId,
			privateKey,
			publicKey,
			refreshToken: tokens.refreshToken,
		});

		return {
			code: 2000,
			message: "User login successfully",
			data: {
				user: getInfoData({
					fields: attributesUser,
					object: newUser,
				}),
				tokens,
			},
		};
	}

	async signOut({ id }) {
		return await KeyTokenService.removeById(id);
	}

	async handlerRefreshToken({ refreshToken }) {
		/**
		 * 1. check refresh token used
		 * 2. get keyToken by refreshToken
		 * 3. create new token
		 * 4. update key token, refreshTokenUsed
		 * 5. return data
		 */

		//1
		const foundToken = await KeyTokenService.get({
			where: {
				[Op.and]: [
					literal(
						`JSON_CONTAINS(refresh_token_used, '["${refreshToken}"]')`
					),
				],
			},
		});
		if (foundToken) {
			await KeyTokenService.removeById(foundToken.id);
			throw new UnauthorizedError(
				"Some thing went wrong happened!!! Pls login"
			);
		}

		//2
		const holderToken = await KeyTokenService.get({
			where: {
				refreshToken,
			},
			attributes: [
				"id",
				"publicKey",
				"privateKey",
				"refreshToken",
				"refreshTokenUsed",
			],
			include: [
				{
					model: UserModel,
					as: "user",
					attributes: attributesUser,
				},
			],
		});
		if (!holderToken) {
			throw new UnauthorizedError("User not registered");
		}
		const {
			id,
			user: { id: userId, email },
			privateKey,
			publicKey,
			refreshTokenUsed,
		} = holderToken;

		//3
		const tokens = createTokenPair(
			{
				userId,
				email,
			},
			privateKey,
			publicKey
		);

		//4
		refreshTokenUsed.push(refreshToken);
		await KeyTokenService.updateById(id, {
			refreshToken: tokens.refreshToken,
			refreshTokenUsed,
		});

		//5
		return {
			user: holderToken.user,
			tokens,
		};
	}

	async handlerAccessToken({ refreshToken }) {
		const holderToken = await KeyTokenService.get({
			where: {
				refreshToken,
			},
			attributes: [
				"id",
				"publicKey",
				"privateKey",
				"refreshToken",
				"refreshTokenUsed",
			],
			include: [
				{
					model: UserModel,
					as: "user",
					attributes: attributesUser,
				},
			],
		});

		if (!holderToken) {
			throw new UnauthorizedError("User not registered");
		}

		const decode = verifyToken(refreshToken, holderToken.privateKey);

		const accessToken = createAccessToken(
			{
				userId: decode.userId,
				email: decode.email,
			},
			holderToken.publicKey
		);
		return {
			user: holderToken.user,
			tokens: {
				accessToken,
			},
		};
	}

	async updateProfile(data) {
		const dataUpdate = {
			firstName: data.firstName,
			lastName: data.lastName,
			displayName: data.displayName,
			phone: data.phone,
			address: data.address,
			photoUrl: data.photoUrl,
			description: data.description,
			avatarUrl: data.avatarUrl,
			birthday: data.birthday || null,
			email: data.email,
		};
		const userUpdated = await this.updateById(data.id, dataUpdate);
		return {
			code: 2000,
			message: "User update successfully",
			data: getInfoData({
				fields: attributesUser,
				object: userUpdated,
			}),
		};
	}
}

export default new AuthService(User);
