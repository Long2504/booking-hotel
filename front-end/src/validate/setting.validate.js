import * as yup from "yup";

const extensionFormSchema = yup.object().shape({
	name: yup.string().required("Trường này không được để trống"),
});

const bedTypeFormSchema = yup.object().shape({
	name: yup.string().required("Trường này không được để trống"),
});

const roomTypeFormSchema = yup.object().shape({
	name: yup.string().required("Trường này không được để trống"),
});

export { extensionFormSchema, bedTypeFormSchema, roomTypeFormSchema };
