import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { withdrawEarningsSchema } from "./schema/withdrawEarningsSchema";
import { AxiosError } from "axios";
import { useWithdrawEarningsRequest } from "../api/withdrawEarningRequest";

export const useWithdrawRequest = (config = {
    mutationConfig: {
        onSuccess: undefined,
        onError: undefined
    }
}) => {

    const {mutateAsync, isLoading: isWithdrawing } = useWithdrawEarningsRequest({
        mutationConfig: {
            onSuccess: (data) => {
                console.log("Withdraw request successful:", data);
                const message = data?.message || "Withdraw request processed";
                if(config?.mutationConfig?.onSuccess){
                    config.mutationConfig.onSuccess({message});
                }
            }
        },
        onError: (error)=>{
            console.error("Withdraw reqeust failed", error);
            if(config?.mutationConfig?.onError){
                config.mutationConfig.onError(error);
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            khalti_phone: "",
        },
        validationSchema: toFormikValidationSchema(withdrawEarningsSchema),
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: async (values, helpers) => {
            try{
                const result = await mutateAsync(values);
                helpers.setStatus({success: true, message: "Withdraw request sent successfully"});
                helpers.resetForm();
            }
            catch(err){
                console.error("Withdraw error:", err);
                helpers.setStatus({success:false});

                if(err instanceof AxiosError && err.response){
                    const statusCode = err.response.status;
                    const responseData = err.response.data;

                    if(statusCode === 422){
                        const validationErrors = responseData.errors || {};
                        helpers.setErrors(validationErrors);
                    }
                    else if (statusCode === 400){
                        helpers.setErrors({submit: responseData.error});
                    }
                    else {
                        helpers.setErrors({ submit: responseData.message || "Withdraw request failed" });

                    }
                  
                }else{
                    helpers.setErrors({submit: "An unexpected error occured"})
                }
            }
            finally{
                helpers.setSubmitting(false);
            }
        }
    });

    return {formik, isWithdrawing};
    
}