import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ALL_COURSES } from "../../../../../services/graphql/mutations/courses"; // Assuming ALL_COURSES mutation provides courses data
import { ICourse } from "../../../../../interfaces";

const LoadMoreCourses: React.FC = () => {
  const [loadedCourses, setLoadedCourses] = useState<ICourse[]>([]);
  const [skip, setSkip] = useState<number>(0); // Skip parameter for pagination

  const { loading, error, data } = useQuery(ALL_COURSES, {
    variables: { take: 4, skip }, // Fetch 4 courses per request with skip offset
    fetchPolicy: "cache-and-network", // Fetch from cache then network
  });

  const loadMoreCourses = () => {
    setSkip(skip + 4); // Increment skip for next batch
  };

  useEffect(() => {
    if (data && data.allCourses && data.allCourses.length > 0) {
      const coursesWithNonNullType = data.allCourses.map((course: ICourse) => ({
        ...course,
        course_type: course.course_type || "DefaultCourseType",
      }));
      setLoadedCourses([...loadedCourses, ...coursesWithNonNullType]);
    }
  }, [data]);

  return (
    <div className="lg:border mx-auto max-w-7xl h-auto sm:px-6 lg:px-8">
      <h1 className="text-center pt-3 text-1xl capitalize mb-5 text-[#094B10]">
        All Courses
      </h1>
      {loading && <p className="text-center">Loading Courses...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}
      <div>
        {loadedCourses.map((course) => (
          <div key={course.title}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
      {data && data.allCourses && data.allCourses.length === 0 ? (
        <p className="text-center text-gray-500">No more courses to fetch</p>
      ) : (
        <button
          onClick={loadMoreCourses}
          className="bg-[#094B10] flex mt-20 justify-center items-center rounded-md text-white px-4 py-2 w-[300px] mb-4 mx-auto "
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMoreCourses;
