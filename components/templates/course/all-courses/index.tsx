import React, { useState } from "react";
import NewsLetterForm from "../../../ui/atom/forms/NewsLetterForm";
import BecomeMentor from "../../../ui/organisms/home/become-a-mentor";
import MenteeDashboardHero from "../../../ui/organisms/user/dashboard/hero";
import CoursesSection from "../../../ui/organisms/user/dashboard/courses-mentors-workshop/CoursesSection";
import { useRouter } from "next/router";

const AllCoursesPageTemplate = () => {
  return (
    <div className="relative">
      <MenteeDashboardHero />
      {/* <h1 className="my-4 text-center">All Courses</h1> */}
      <div className="mb-10">
        <CoursesSection />
      </div>
      <BecomeMentor />

      {/* <div>
        <LoadMoreCourses />
      </div> */}
      <>
        <h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
          Subscribe to our Newsletter
        </h1>
        <div className="flex justify-center my-5 mb-10">
          <NewsLetterForm handleSubmit={(email) => console.log(email)} />
        </div>
      </>
    </div>
  );
};

export default AllCoursesPageTemplate;
