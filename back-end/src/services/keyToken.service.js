import KeyTokenModel from "../models/keyToken.model.js";
import BaseService from "./base.service.js";

class KeyTokenService extends BaseService {
    async createKeyToken({ userId, privateKey, publicKey, refreshToken }) {
        let keyToken = await this.findOneAndUpdate(
            { userId },
            {
                privateKey,
                publicKey,
                refreshTokenUsed: [],
                refreshToken,
            }
        );
        if (!keyToken) {
            keyToken = await this.create({
                userId,
                privateKey,
                publicKey,
                refreshTokenUsed: [],
                refreshToken,
            });
        }
        return keyToken;
    }
}

export default new KeyTokenService(KeyTokenModel);
