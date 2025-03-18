import React from "react";
export const CheckoutSteps = ({ currentStep }) => {
    const steps = [
        { id: "cart", label: "Cart", number: 1 },
        { id: "shipping", label: "Shipping", number: 2 },
        { id: "payment", label: "Payment", number: 3 },
    ];

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="flex md:justify-center md:items-center space-x-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        {index > 0 && <div className="w-8 h-px bg-gray-300"></div>}
                        <div
                            className={`flex items-center ${
                                currentStep === step.id ? "text-green-600 font-medium" : "text-gray-500"
                            }`}
                        >
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                    currentStep === step.id ? "bg-green-600 text-white" : "bg-gray-200"
                                }`}
                            >
                                {step.number}
                            </span>
                            {step.label}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
