import React, { FC } from "react";

export const AddNewLectureButton: FC<{ handleAddNewLecture: any }> = ({ handleAddNewLecture }) => (
	<div className="flex flex-col gap-2 items-center cursor-pointer select-none" onClick={handleAddNewLecture}>
		<svg width="25" height="25" viewBox="0 0 18 18" fill="none">
			<path
				d="M16.5 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V16.5C0 16.8978 0.158035 17.2794 0.43934 17.5607C0.720644 17.842 1.10218 18 1.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5V1.5C18 1.10218 17.842 0.720644 17.5607 0.43934C17.2794 0.158035 16.8978 0 16.5 0ZM14.25 9.75H9.75V14.25C9.75 14.4489 9.67098 14.6397 9.53033 14.7803C9.38968 14.921 9.19891 15 9 15C8.80109 15 8.61032 14.921 8.46967 14.7803C8.32902 14.6397 8.25 14.4489 8.25 14.25V9.75H3.75C3.55109 9.75 3.36032 9.67098 3.21967 9.53033C3.07902 9.38968 3 9.19891 3 9C3 8.80109 3.07902 8.61032 3.21967 8.46967C3.36032 8.32902 3.55109 8.25 3.75 8.25H8.25V3.75C8.25 3.55109 8.32902 3.36032 8.46967 3.21967C8.61032 3.07902 8.80109 3 9 3C9.19891 3 9.38968 3.07902 9.53033 3.21967C9.67098 3.36032 9.75 3.55109 9.75 3.75V8.25H14.25C14.4489 8.25 14.6397 8.32902 14.7803 8.46967C14.921 8.61032 15 8.80109 15 9C15 9.19891 14.921 9.38968 14.7803 9.53033C14.6397 9.67098 14.4489 9.75 14.25 9.75Z"
				fill="white"
			/>
		</svg>
		<p className="text-xs text-white select-none">Add New</p>
	</div>
);
export const DuplicateLectureButton: FC<{ handleDuplicateLecture: any }> = ({ handleDuplicateLecture }) => (
	<div className="flex flex-col gap-2 items-center cursor-pointer select-none" onClick={handleDuplicateLecture}>
		<svg width="25" height="28" viewBox="0 0 18 21" fill="none">
			<path
				d="M1.8 3.64875V14.875C1.79982 15.9858 2.23422 17.055 3.01507 17.8658C3.79592 18.6767 4.86477 19.1684 6.0048 19.2412L6.3 19.25H14.2452C14.0591 19.7617 13.7144 20.2048 13.2586 20.5182C12.8028 20.8316 12.2583 20.9999 11.7 21H5.4C3.96783 21 2.59432 20.4469 1.58162 19.4623C0.568927 18.4777 3.71226e-07 17.1424 3.71226e-07 15.75V6.125C-0.000292464 5.58193 0.17267 5.05214 0.495051 4.60864C0.817431 4.16514 1.27336 3.82977 1.8 3.64875ZM15.3 0C16.0161 0 16.7028 0.276562 17.2092 0.768845C17.7155 1.26113 18 1.92881 18 2.625V14.875C18 15.5712 17.7155 16.2389 17.2092 16.7312C16.7028 17.2234 16.0161 17.5 15.3 17.5H6.3C5.58392 17.5 4.89716 17.2234 4.39081 16.7312C3.88446 16.2389 3.6 15.5712 3.6 14.875V2.625C3.6 1.92881 3.88446 1.26113 4.39081 0.768845C4.89716 0.276562 5.58392 0 6.3 0H15.3Z"
				fill="white"
			/>
			<text
				x="53%"
				y="50%"
				textAnchor="middle"
				dy=".3em"
				// dx="-.3em"
				fill="black"
				alignmentBaseline="middle"
				fontSize={10}>
				{/* {currentContentIndex + 1} */}
			</text>
		</svg>
		<p className="text-xs text-white select-none">Duplicate</p>
	</div>
);
export const DeleteLectureButton: FC<{ handleDelete: any }> = ({ handleDelete }) => (
	<div className="flex flex-col gap-2 items-center cursor-pointer select-none" onClick={handleDelete}>
		<svg width="25" height="28" viewBox="0 0 18 24" fill="none">
			<path
				d="M1.28571 20.5714C1.28571 21.9857 2.44286 23.1429 3.85714 23.1429H14.1429C15.5571 23.1429 16.7143 21.9857 16.7143 20.5714V5.14286H1.28571V20.5714ZM18 1.28571H13.5L12.2143 0H5.78571L4.5 1.28571H0V3.85714H18V1.28571Z"
				fill="white"
			/>
		</svg>
		<p className="text-xs text-white select-none">Delete</p>
	</div>
);
