import { useRouter } from "next/router";
import React from "react";
import { PrimaryButton } from "../../../../ui/atom/buttons";

const ResetPasswordWeldone = () => {
	const router = useRouter();
	return (
		<>
			<div className="pt-20 flex justify-center min-h-[80vh] px-10 md:px-20">
				<div className="mt-20">
					<h1 className="md:text-8xl text-4xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
						Weldone
					</h1>
					<div className="my-5 text-[#094B10] text-xl max-w-2xl" style={{ fontFamily: "Days One" }}>
						You have successfully reset your password, however, we’d need you to provide the password again
						to be sure it’s you.
					</div>
					<div className="sm:flex grid gap-5 mt-5 items-center my-5">
						<PrimaryButton
							onClick={() => {
								router.replace("/auth?login");
							}}
							title={"Continue"}
							className="px-12 duration-300 p-3 text-center"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResetPasswordWeldone;
