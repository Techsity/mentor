import React from "react";
import { PrimaryButton } from "../buttons";
import { useModal } from "../../../../context/modal.context";

type Props = {
	title: string;
	body: string;
	next?: () => void;
	buttonText?: { nextBtn?: string; cancelBtn?: string };
};

const PromptModal = (props: Props) => {
	const { closeModal } = useModal();
	const { body, title, next, buttonText } = props;
	const { nextBtn, cancelBtn } = buttonText || {};
	return (
		<div className="bg-white flex flex-col gap-4 relative p-5 w-[95vw] sm:w-[35vw] max-h-[60vh] overflow-y-scroll hide-scroll-bar rounded-lg overflow-hidden">
			<div className="w-full">
				<h1 className="font-semibold capitalize">{title}</h1>
				<hr className="my-3" />
				<p className="text-sm text-zinc-600">{body}</p>
			</div>
			<div className="flex justify-between gap-4 items-center w-full">
				<PrimaryButton
					onClick={closeModal}
					title={cancelBtn || "not now"}
					className="text-sm p-1.5 px-3 w-full flex justify-center items-center capitalize !text-[#094B10] bg-[#FFB100]"
				/>
				<PrimaryButton
					onClick={next}
					title={nextBtn || "continue"}
					className="text-sm p-1.5 px-3 w-full flex justify-center items-center capitalize"
				/>
			</div>
		</div>
	);
};

export default PromptModal;
