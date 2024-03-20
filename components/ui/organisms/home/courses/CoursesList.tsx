import React, { useState } from "react";
import DisplayCourseCard from "../../../atom/cards/course/DisplayCourseCard";
import { ICourse } from "../../../../../interfaces";
import { useQuery } from "@apollo/client";
import { ALL_COURSES } from "../../../../../services/graphql/queries/course";
import { PrimaryButton } from "../../../atom/buttons";

type AllCoursesArgs = {
  take: number;
  skip: number;
  category?: string;
  courseType?: string;
};
type CourseListProps = { activeCategory: string; activeCourseType: string };

const CoursesList = ({ activeCategory, activeCourseType }: CourseListProps) => {
  const THRESHOLD = 6; // Number of courses displayed initially
  const INCREMENT = 4; // Number of courses loaded on "Load More" click

  const [limit, setLimit] = useState<number>(THRESHOLD);
  const [skip, setSkip] = useState<number>(0);

  const { data, loading, error } = useQuery<
    { allCourses: ICourse[] },
    AllCoursesArgs
  >(ALL_COURSES, {
    variables: {
      skip,
      take: limit + THRESHOLD,
      category: activeCategory,
      courseType: activeCourseType,
    },
    fetchPolicy: "cache-and-network",
  });

  const allCourses = data?.allCourses || [];


  const fetchMore = () => {
    setSkip(skip + limit); // Incrementing skip to fetch the next batch
    setLimit(limit + INCREMENT); // Increasing the limit for rendering more courses
  };

  if (error) console.log(error);

  return (
    <>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 bg-[#FDFDFD] tracking-tight gap-6 overflow-hidden h-full sm:p-5">
        {loading ? (
          Array.from({ length: limit }).map((_, indx) => {
            return (
              <DisplayCourseCard loading={loading} course={null} key={indx} />
            );
          })
        ) : !loading && !error && allCourses.length < 1 ? (
          <h1 className="text-lg text-[#d31119] tracking-tight">
            No courses under this category
          </h1>
        ) : (
          allCourses
            .map((course, indx) => {
              return (
                <DisplayCourseCard
                  loading={loading}
                  course={course}
                  key={indx}
                />
              );
            })
            .slice(0, limit)
        )}
        {!loading && error && (
          <h1 className="text-lg text-[#d31119] tracking-tight">
            Network Error.
          </h1>
        )}
      </div>
      {!loading &&
        !error &&
        allCourses.length >= limit && ( // Adjusted condition for displaying Load more button
          <div className="max-w-xs mx-auto py-4">
            <PrimaryButton
              title="Load more"
              className="w-full p-1 flex justify-center items-center rounded-lg"
              onClick={fetchMore}
            />
          </div>
        )}
    </>
  );
};

export default CoursesList;
