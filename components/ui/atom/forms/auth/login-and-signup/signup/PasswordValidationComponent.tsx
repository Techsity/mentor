import React, { useEffect, useState } from "react";
import { validatePassword, getRuleRegex } from "../../../../../../../utils";

const PasswordValidationComponent = ({
	password,
	isValid,
}: {
	password: string;
	isValid?: (checked: boolean) => void;
}) => {
	const rules: { rule: "8" | "number" | "capital"; name: string }[] = [
		{ name: "8 Characters", rule: "8" },
		{ name: "Number", rule: "number" },
		{ name: "Capital letter", rule: "capital" },
	];

	const [passedRules, setPassedRules] = useState<{ rule: string; passed: boolean }[]>(
		rules.map((rule) => ({ rule: rule.name, passed: false })),
	);

	const updatedPassedRules = rules.map((rule) => ({
		rule: rule.name,
		passed: validatePassword(password, rule.rule),
	}));

	useEffect(() => {
		setPassedRules(updatedPassedRules);
	}, [password]);

	useEffect(() => {
		const allRulesPassed = updatedPassedRules.every((rule) => rule.passed);
		if (isValid) isValid(allRulesPassed);
	}, [passedRules]);
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-sm">Password hint:</h1>
			<div className="flex flex-wrap gap-5 items-center whitespace-nowrap">
				{rules.map((rule, index) => (
					<div key={index} className="flex text-[12px] items-center cursor-default">
						<div className="flex justify-center border p-[2px] border-[#70C5A1]">
							<svg width="11" height="10" viewBox="0 0 11 10" fill="none">
								{passedRules[index].passed ? (
									<path
										className="animate__animated animate__bounceIn"
										d="M3.87498 9.06081L0.51123 5.69706L2.04415 4.16414L3.87498 6.00039L9.22665 0.643311L10.7596 2.17623L3.87498 9.06081Z"
										fill="#0CF27E"
									/>
								) : null}
							</svg>
						</div>
						<span className="ml-2">{rule.name}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PasswordValidationComponent;
