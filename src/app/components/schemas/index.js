import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().min(3).required(),
  fatherName: yup.string().min(3).required("Father name is required"),
  email: yup.string().email().required(),
  phone: yup.number(11).required(),
});
