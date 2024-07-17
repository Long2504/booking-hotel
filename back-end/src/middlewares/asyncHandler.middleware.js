
import keyTokenService from "../services/keyToken.service.js";
import { NotFoundError, UnauthorizedError } from "../utils/error.response.js";
import { HEADER } from "../middlewares/constant.middleware.js";
import { verifyToken } from "../helper/auth.helper.js";
const asyncHandler = (fn) => {
    return (req, res, next) => fn(req, res, next).catch(next);
};

const authentication = asyncHandler(async (req, res, next) => {
    /**
     * TODO: check authentication
     * 1. Check userId missing
     * 2. Get access token
     * 3. Verify access token
     * 4. Check user
     */
    //1
    let userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new UnauthorizedError("Invalid request");
    //2
    const keyStore = await keyTokenService.get({
        where: { userId },
    });
    if (!keyStore) throw new NotFoundError("Not found key store");

    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new UnauthorizedError("Invalid request");

    //4
    const { publicKey } = keyStore;
    const decode = verifyToken(accessToken, publicKey);
    if (userId !== decode.userId)
        throw new UnauthorizedError("Invalid request");
    req.keyStore = keyStore.toJSON();

    next();
});


export { asyncHandler, authentication };
