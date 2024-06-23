import bcrypt from "bcryptjs";
import { Op, literal } from "sequelize";

import User from "../models/user.model.js";
import BaseService from "./base.service.js";
import KeyTokenService from "./keyToken.service.js";
import { createTokenPair } from "../helper/auth.helper.js";
import { BadRequestError, UnauthorizedError } from "../utils/error.response.js";
import { getInfoData } from "../utils/index.utils.js";
import UserModel from "../models/user.model.js";

const { randomBytes } = await import("node:crypto");

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
                        fields: ["id", "email"],
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
                    fields: ["id", "email"],
                    object: holder,
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
                    attributes: ["id", "email"],
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
}

export default new AuthService(User);
