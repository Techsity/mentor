import React, { ChangeEvent, FC, useState } from "react";
import { IWorkshop, IWorkshopContent } from "../../../../../interfaces";
import CustomTextInput from "../../../atom/inputs/CustomTextInput";

type Props = {
	state: Omit<IWorkshop, "mentor">;
};

const AddWorkShopSchedule = ({ state }: Props) => {
	const initialWorkshopContentState: IWorkshopContent[] = [{ date: new Date().toDateString(), title: "" }];

	const [workshopContentState, setWorkshopState] = useState<IWorkshopContent[]>(
		state.contents || initialWorkshopContentState,
	);

	const handleAddNew = () => {
		if (
			workshopContentState.length < 5 &&
			workshopContentState[workshopContentState.length - 1].title !== "" &&
			workshopContentState[workshopContentState.length - 1].date !== ""
		) {
			setWorkshopState((prev) => prev.concat(initialWorkshopContentState));
		}
	};
	return (
		<>
			<div className="flex item-center justify-start">
				<h1 className="mt-9 text-[#B1B1B1] font-normal text-sm">Workshop schedule</h1>
			</div>
			{workshopContentState.length > 0
				? workshopContentState.map((content, index) => {
						return (
							<ContentCard
								updateState={(updated) => setWorkshopState(updated)}
								{...{ content, index, state: workshopContentState }}
								key={index}
							/>
						);
				  })
				: Array.from({ length: 1 }).map((_, index) => {
						return <ContentCard state={workshopContentState} content={null} index={index} key={index} />;
				  })}
			<div className="flex item-center justify-end">
				<button
					type="button"
					disabled={workshopContentState.length === 5}
					onClick={handleAddNew}
					className={`${
						workshopContentState.length === 5 ? "text-[#bebebe]" : "text-[#70C5A1]"
					} select-none cursor-pointer font-normal text-sm`}>
					+ Add New
				</button>
			</div>
		</>
	);
};
type ContentCardProps = {
	index: number;
	content: IWorkshopContent | null;
	state: IWorkshopContent[];
	updateState?: (updatedState: IWorkshopContent[]) => void;
};

const ContentCard: FC<ContentCardProps> = ({ content, index, state, updateState }) => {
	const handleChange = (field: keyof IWorkshopContent) => (e: ChangeEvent<HTMLInputElement>) => {
		const updated = [...state];
		if (updateState) {
			if (index !== -1) {
				// const updateIndex = { field: updated[index][field] };
				updated[index] = { ...updated[index], [field]: e.target.value };
				updateState(updated);
			} else {
				updateState(updated);
			}
		} else {
			console.log(state);
		}
	};
	return (
		<div className="border border-[#70C5A1] p-5 my-6 text-sm">
			<div className="">
				<h1 className="text-[#B1B1B1]">Day {index + 1}</h1>
				<div className="grid md:grid-col-6 mt-4 gap-5">
					<div className="col-span-6">
						<p className="text-[#bebebe]">Title</p>
						<CustomTextInput
							containerProps={{
								className:
									"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
							}}
							placeholder={content?.title}
							value={content?.title}
							onChange={handleChange("title")}
						/>
					</div>
					<div className="col-span-2">
						<p className="text-[#bebebe]">Date</p>
						<CustomTextInput
							containerProps={{
								className:
									"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
							}}
							placeholder={content?.date}
							value={content?.date}
							onChange={handleChange("date")}
						/>
					</div>
					<div className="col-span-2">
						<p className="text-[#bebebe]">Start time</p>
						<CustomTextInput
							containerProps={{
								className:
									"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
							}}
							placeholder={content?.date}
						/>
					</div>
					<div className="col-span-2">
						<p className="text-[#bebebe]">End time</p>
						<CustomTextInput
							containerProps={{
								className:
									"mt-3 border border-[#bebebe] placeholder:text-[#A3A6A7] text-sm animate__animated animate__fadeIn",
							}}
							placeholder={content?.date}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AddWorkShopSchedule;
