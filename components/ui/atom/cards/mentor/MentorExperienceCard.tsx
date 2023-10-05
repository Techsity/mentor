import React from "react";
import { IMentor } from "../../../../../interfaces";

const MentorExperienceCard = (experience: IMentor["experience"][0]) => {
	return <div>{experience.position}</div>;
};

export default MentorExperienceCard;
