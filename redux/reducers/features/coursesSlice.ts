// import { createSlice } from "@reduxjs/toolkit";
// import { ICourse } from "../../../interfaces";
// import { RootState } from "../../store";
// import { slugify } from "../../../utils";
// import { stat } from "fs";
// import courses from "../../../data/courses";

// const initialState: ICourse[] = courses;

// export const coursesSlice = createSlice({
// 	name: "courses",
// 	initialState,
// 	reducers: {
// 		setCourses: (state, action: { payload: ICourse[] }) => {
// 			action.payload.forEach((newCourse: ICourse) => {
// 				if (
// 					!state.some(
// 						(existingCourse) =>
// 							slugify(existingCourse.title) ===
// 							slugify(newCourse.title),
// 					)
// 				) {
// 					state.push(newCourse);
// 				}
// 			});
// 			return state;
// 		},
// 	},
// });
