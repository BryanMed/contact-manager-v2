import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required,
  lastName: yup.string(),
  company: yup.string(),
  phone: yup.string(),
  email: yup.string().email().required(),
});
