import jwt from "jsonwebtoken";

const createTokenPair = (payload, privateKey, publicKey) => {
    const accessToken = jwt.sign(payload, publicKey, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};

export { createTokenPair };
