import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../formik/schema/authschema";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordFormik = () => {
  const navigate = useNavigate();

  return useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: (values) => {
      navigate("/user/verification");
      console.log("Email submitted:", values.email);
    },
  });
};
