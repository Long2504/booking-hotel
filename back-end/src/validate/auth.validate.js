import { check } from "express-validator";

const validateEmail = check("email").isEmail().withMessage("Email is not valid");
const validatePassword = check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters");

const validateTokenId = check("tokenId").not().isEmpty().withMessage("TokenId is not valid");


const validateSignIn = [validateEmail, validatePassword];
const validateSignInByGoogle = [validateTokenId];



export { validateSignIn, validateSignInByGoogle };