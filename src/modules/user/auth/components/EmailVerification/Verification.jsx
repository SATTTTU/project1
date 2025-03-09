import { BiLogoGmail } from "react-icons/bi";
import Verify from "../../../../../assets/UserImages/verify.jpeg";
import { Link } from "react-router-dom";

export const Verification = () => {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center  p-4">
			<div className=" max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
				<h1 className="mb-2 text-3xl font-medium text-[#426B1F]">
					Verify Your Email Address
				</h1>
				<p className="mb-8 text-gray-500">
					Check your email & changed password.
				</p>
				<div>
					<img src={Verify} alt="gmail" />
				</div>
				
				<div className="flex flex-col justify-center ">
					<button className="flex justify-center gap-4 items-center rounded-lg bg-[#4b6c1e] px-4 py-2 font-medium text-white transition ">
				<BiLogoGmail className="text-3xl "/>		Open Gmail
					</button>
					<button className="mt-4  rounded-lg bg-[#4b6c1e] px-4 py-3 font-medium text-white transition hover:bg-[#5a8225]">
						Resend  Email
					</button>
				</div>
			</div>
		</div>
	);
};
