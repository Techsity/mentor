import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { PrimaryButton } from "../buttons";
import CustomTextInput from "./CustomTextInput";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";

const TagsInput = ({
	addTag,
	onRemove,
	tagsState,
	textLength = 15,
	showSelectedTags = true,
}: {
	textLength?: number;
	tagsState: string[];
	showSelectedTags?: boolean;
	addTag?: (tag: string) => void;
	onRemove?: (tag: string) => void;
}) => {
	const [currentTag, setCurrentTag] = useState<string>("");

	return (
		<>
			<div className="flex items-center text-sm flex-row gap-2">
				<div className="w-full">
					<label>
						<CustomTextInput
							maxLength={textLength}
							onChange={(e) => setCurrentTag(e.target.value)}
							value={currentTag}
							type="text"
							className="bg-white invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
							placeholder="Type something"
							containerProps={{
								className: "border border-[#00D569]",
							}}
						/>
						{/* <p className="ml-2 text-xs text-pink-700 invisible peer-invalid:visible">
											less than 5 characters
										</p> */}
					</label>
				</div>
				<div className="flex justify-start">
					<PrimaryButton
						onClick={() => {
							if (tagsState.includes(currentTag)) {
								toast.info(
									"Tag has aleady been added!",
									ToastDefaultOptions({
										id: "info",
										theme: "dark",
									}),
								);
								return;
							}
							if (addTag) {
								addTag(currentTag.trim());
								setCurrentTag("");
							}
							// addTag && addTag(currentTag.trim());
						}}
						title="Add"
						className="flex justify-center w-full px-5 p-4 h-full"
					/>
				</div>
			</div>
			{showSelectedTags && tagsState.length > 0 && (
				<div className="px-2 pt-2 py-6 flex flex-wrap rounded border border-[#00D569] bg-[#70C5A13A] animate__fadeIn animate__animated animate__fastest overflow-hidden">
					{tagsState.map((tag, id) => (
						<span
							key={id}
							className="animate__fadeInDown animate__animated flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-[#fff]">
							{tag}
							<svg
								onClick={() => {
									onRemove && onRemove(tag);
								}}
								className="h-5 w-5 ml-3"
								viewBox="0 0 20 20"
								fill="#d31119">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
					))}
				</div>
			)}
		</>
	);
};

export default TagsInput;
