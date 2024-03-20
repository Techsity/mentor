import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/ui/atom/buttons";
import ActivityIndicator from "../../../components/ui/atom/loader/ActivityIndicator";
import { useRouter } from "next/router";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../../utils/confetti.config";

const OnboardingCongratulations = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [celebrate, setCelebrate] = useState<boolean>(false);

	useEffect(() => {
		setCelebrate(true);
	}, []);
	return (
		<>
			<div className="flex justify-center items-center min-h-[80vh] px-10 md:px-20">
				<Confetti active={celebrate} config={{ ...confettiConfig }} />
				<div className="">
					<h1 className="md:text-8xl text-4xl text-[#00D569]" style={{ fontFamily: "Days One" }}>
						Congra <br /> tulations!
					</h1>
					<div className="my-5 text-[#094B10]" style={{ fontFamily: "Days One" }}>
						Begin your Journey to endless knowledge
					</div>
					<div className="sm:flex grid gap-5 mt-5 items-center my-5">
						<PrimaryButton
							onClick={() => {
								setLoading(true);
								setTimeout(function () {
									router.replace("/dashboard");
								}, 2000);
							}}
							disabled={loading}
							title={!loading ? "Continue" : ""}
							icon={
								loading ? (
									<div className="flex justify-center">
										<ActivityIndicator />
									</div>
								) : null
							}
							className="px-12 duration-300 p-3 text-center"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default OnboardingCongratulations;
