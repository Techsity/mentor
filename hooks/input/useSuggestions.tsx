import React, { useEffect, useState } from "react";
import classnames from "classnames";

interface SuggestionsProps<T> {
	suggestions: T[];
	inputValue?: T;
	animated?: boolean;
}

function useSuggestions<T>(props: SuggestionsProps<T>) {
	const { suggestions, inputValue, animated = false } = props;
	const [selectedSuggestions, setSelectedSuggestions] = useState<T[]>([]);

	const filteredSuggestions: T[] = suggestions.filter((s: any) =>
		inputValue
			? s
					.trim()
					.toLowerCase()
					.includes((inputValue as any)?.trim().toLowerCase())
			: inputValue,
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
		onSuggestionClick: (suggestion: T) => void;
		classes?: { container?: string; item?: string };
	}) => {
		const { onSuggestionClick, classes } = props;
		const handleSuggestionClick = (suggestion: T) => {
			setSelectedSuggestions([]);
			onSuggestionClick(suggestion);
		};
		return (
			suggestions.length > 0 && (
				<ul
					className={classnames(
						"absolute z-10 mt-2 bg-white border border-gray-300 rounded-md w-auto",
						classes?.container,
						animated ? "animate__animated animate__fadeInUp animate__fastest" : "",
					)}>
					{selectedSuggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className={classnames("cursor-pointer p-2 hover:bg-gray-100", classes?.item)}>
							{suggestion as React.ReactPortal}
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
}
export default useSuggestions;
