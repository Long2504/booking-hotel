import { check } from "express-validator";

const validateName = check("name")
	.not()
	.isEmpty()
	.withMessage("Name is not valid");

const validateExtensionId = check("extensionId").not().isEmpty().withMessage("ExtensionId is not valid"); 



const validateBedType = [validateName];
const validateSubExtension = [validateName, validateExtensionId];
const validateExtension = [validateName];
const validateRoomType = [validateName];

export {
	validateBedType,
	validateSubExtension,
	validateExtension,
	validateRoomType,
};
