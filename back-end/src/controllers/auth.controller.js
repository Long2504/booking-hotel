import AuthService from "../services/auth.service.js";
import { Created, SuccessResponse } from "../utils/access.response.js";

class AuthController {
    static signUp = async (req, res) => {
        new Created({
            message: "Register success",
            metaData: await AuthService.signUp(req.body),
        }).send(res);
    };

    static signIn = async (req, res) => {
        new SuccessResponse({
            message: "Login success",
            metaData: await AuthService.signIn(req.body),
        }).send(res);
    };

    static signInByGoogle = async (req, res) => {
        new SuccessResponse({
            message: "Login success",
            metaData: await AuthService.signInByGoogle(req.body),
        }).send(res);
    };

    static signOut = async (req, res) => {
        new SuccessResponse({
            message: "Logout success",
            metaData: await AuthService.signOut(req.keyStore),
        }).send(res);
    };

    static handlerRefreshToken = async (req, res) => {
        new SuccessResponse({
            message: "Refresh token success",
            metaData: await AuthService.handlerRefreshToken(req.body),
        }).send(res);
    };

    static handlerAccessToken = async (req, res) => {
        new SuccessResponse({
            message: "Access token success",
            metaData: await AuthService.handlerAccessToken(req.body),
        }).send(res);
    };

    static updateProfile = async (req, res) => {
        console.log(req.body);
        new SuccessResponse({
            message: "Update profile success",
            metaData: await AuthService.updateProfile(req.body),
        }).send(res);
    };
}

export default AuthController;
