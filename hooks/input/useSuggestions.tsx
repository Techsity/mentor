import React, { useEffect, useState } from "react";
import classnames from "classnames";

const useSuggestions = (props: {
	suggestions: string[];
	inputValue?: string;
	animated?: boolean;
}) => {
	const { suggestions, inputValue, animated = false } = props;
	const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>(
		[],
	);
	const filteredSuggestions: string[] = suggestions.filter((s) =>
		inputValue
			? s.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
			: s,
	);

	useEffect(() => {
		if (inputValue) {
			setSelectedSuggestions(filteredSuggestions);
		}
		return () => {
			setSelectedSuggestions([]);
		};
	}, [inputValue]);

	const SuggestionsComponent = (props: {
		onSuggestionClick: (suggestion: string) => void;
		classes?: { container?: string; item?: string };
	}) => {
		const { onSuggestionClick, classes } = props;
		return (
			suggestions.length > 0 && (
				<ul
					className={classnames(
						"absolute z-10 mt-2 bg-white border border-gray-300 rounded-md w-auto",
						classes?.container,
						animated
							? "animate__animated animate__fadeInUp animate__fastest"
							: "",
					)}>
					{selectedSuggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => {
								onSuggestionClick(suggestion);
								setSelectedSuggestions([]);
							}}
							className={classnames(
								"cursor-pointer p-2 hover:bg-gray-100",
								classes?.item,
							)}>
							{suggestion}
						</li>
					))}
				</ul>
			)
		);
	};
	return {
		selectedSuggestions,
		SuggestionsComponent,
		setSelectedSuggestions,
	};
};
export default useSuggestions;
