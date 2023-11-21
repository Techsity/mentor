import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useSuggestions from "../../../../../../../hooks/input/useSuggestions";
import { useDispatch, useSelector } from "react-redux";
import {
	setOnboardingMentor,
	onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";

const Languages = ({ reEdit = false }: { reEdit?: boolean }) => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const languageInputRef = useRef<HTMLInputElement>(null);

	const languageSuggestions = [
		"English",
		"French",
		"Russia",
		"German",
		"Spanish",
		"Chinese",
	];
	const [language, setLanguage] = useState<string>("");
	const [languageInput, setLanguageInput] = useState<string>("");
	const {
		SuggestionsComponent,
		setSelectedSuggestions,
		selectedSuggestions,
	} = useSuggestions({
		suggestions: onboardingMentor.languages
			? [...languageSuggestions, ...onboardingMentor.languages]
			: languageSuggestions,
		inputValue: language,
	});

	const updateLanguages = (lang: string) => {
		languageInputRef.current && languageInputRef.current?.focus();
		if (
			lang &&
			onboardingMentor.languages &&
			!onboardingMentor.languages.some((l) => l === lang)
		)
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					languages:
						onboardingMentor.languages &&
						onboardingMentor.languages.concat(lang),
				}),
			);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLanguageInput(e.target.value);
		setTimeout(function () {
			setLanguage(e.target.value);
		}, 500);
	};

	useEffect(() => {
		if (language) {
			if (languageSuggestions.filter((l) => l !== language))
				setSelectedSuggestions([
					language,
					...languageSuggestions.filter((lang) =>
						lang.includes(language),
					),
				]);
		}
	}, [language]);

	return (
		<div className="grid gap-2 relative">
			{!reEdit && (
				<h1 className="text-sm text-[#B1B1B1]">
					Languages Spoken Fluently
				</h1>
			)}
			<CustomTextInput
				type="text"
				onChange={handleChange}
				value={languageInput}
				className="bg-white"
				ref={languageInputRef}
				containerProps={{
					className: "border border-[#00D569]",
				}}
			/>
			<div className="absolute top-20 left-0 w-full">
				<SuggestionsComponent
					onSuggestionClick={(lang) => {
						setLanguage("");
						setLanguageInput("");
						updateLanguages(lang);
					}}
				/>
			</div>
			<span className="text-sm text-[#B1B1B1]">
				{onboardingMentor.languages &&
					onboardingMentor.languages.join(", ")}
			</span>
		</div>
	);
};

export default Languages;
