import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().min(3).required("Name is required"),
  fatherName: yup.string().min(3).required("Father name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^0\d+$/, "Phone number must start with 0 and contain only digits")
    .test(
      "03000000000",
      "Must be exactly 11 digits",
      (value) => {
        return value && value.length === 11;
      }
    )
    .required("Phone Number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
