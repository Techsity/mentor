import React, { ChangeEvent, FormEvent, useId, useState } from "react";
import { useModal } from "../../../../context/modal.context";
import { useMutation } from "@apollo/client";
import { REPORT_MENTOR } from "../../../../services/graphql/mutations/mentors";
import { formatGqlError } from "../../../../utils/auth";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../../../constants";
import { slugify } from "../../../../utils";
import { PrimaryButton } from "../buttons";
import CustomTextArea from "../inputs/CustomTextArea";
import classNames from "classnames";
import ActivityIndicator from "../loader/ActivityIndicator";

type ReportInput = {
	input: {
		content: string;
		mentorId: string;
	};
};

const ReportModal = ({ mentorId }: any) => {
	const CONTENT_THRESHOLD = 200;
	const toastId = useId();
	const { closeModal } = useModal();
	if (!mentorId) {
		closeModal();
		return;
	}
	const reportCategories = ["Sexual Harrasment", "Scam", "Bot", "Personal"]; // Todo: use JSON file
	const [content, setContent] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>(reportCategories[0] || "");
	const [reportMentor, { loading }] = useMutation<any, ReportInput>(REPORT_MENTOR);
	const [limitReached, setLimitReached] = useState<boolean>(false);

	// "input": {
	//     "content": "This mentor is always unavailable",
	//     "mentorId": "a39e7f31-2aa3-42d3-a74c-348ee5d91aa6"
	//   }

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		if (value.length < CONTENT_THRESHOLD + 1) setContent(value);
		setLimitReached(value.length >= CONTENT_THRESHOLD + 1);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!limitReached) {
			if (!content || content == "")
				return toast.error("Report content cannot be empty", { ...ToastDefaultOptions(), toastId });
			try {
				const { data } = await reportMentor({ variables: { input: { content, mentorId } } });
				if (data.reportMentor.id) {
					closeModal();
					toast.success("Your report has ben submitted", { toastId, ...ToastDefaultOptions() });
				}
			} catch (error) {
				console.error({ error });
				const errMsg = formatGqlError(error);
				toast.error(errMsg, { ...ToastDefaultOptions(), toastId });
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white h-auto w-[85vw] md:w-[65vw] rounded p-5 inline-block">
			<h1 className="text-[16px] font-medium">Report Mentor</h1>
			<CustomTextArea
				onChange={handleChange}
				containerProps={{ className: `text-sm my-4 ${limitReached ? "border-red-500" : ""}` }}
			/>
			<div className="flex justify-between items-center">
				<ul className="flex items-center gap-2 text-sm my-2">
					{reportCategories.map((c, i) => (
						<li
							className="flex items-center gap-1 cursor-pointer"
							onClick={() => setSelectedCategory(slugify(c))}
							key={i}>
							<input type="radio" checked={slugify(selectedCategory) === slugify(c)} />
							{c}
						</li>
					))}
				</ul>
				<span className={classNames("text-sm", limitReached && "text-red-500")}>
					{limitReached && "Limit is "} {!limitReached ? content.length : CONTENT_THRESHOLD} words
				</span>
			</div>
			<PrimaryButton
				title={!loading ? "Submit" : ""}
				type="submit"
				disabled={loading || limitReached}
				icon={loading ? <ActivityIndicator /> : <></>}
				className="p-1.5 px-4 rounded mt-3 flex justify-center"
			/>
		</form>
	);
};

export default ReportModal;
