import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().min(3).required("Name is required"),
  fatherName: yup.string().min(3).required("Father name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^0\d+$/, "Phone number must start with 0 and contain only digits")
    .test(
      "03000000000", // Arbitrary test name
      "Must be exactly 11 digits", // Validation error message
      (value) => {
        // Ensure the value exists, is a number, and has exactly 10 digits when converted to a string
        return value && value.length === 11;
      }
    )
    .required("Phone Number is required"),
});
