import React, { useState } from "react";
import {
	setOnboardingMentor,
	onboardingMentor as onboardingMentorState,
} from "../../../../../../../redux/reducers/features/onboardingSlice";
import CustomTextInput from "../../../../../atom/inputs/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { IMentorOnboardingState } from "../../../../../../../interfaces/mentor.interface";
import { slugify } from "../../../../../../../utils";
import Calendar from "react-calendar";

type CertificateType = IMentorOnboardingState["certificates"][0];

const Certificates = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const initalState: CertificateType = {
		institution: "",
		type: "",
		year: "",
	};

	const [certificate, setCertificate] =
		useState<CertificateType>(initalState);

	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);

	const handleAddCert = () => {
		if (certificate.institution && certificate.type && certificate.year) {
			const isDuplicate =
				onboardingMentor.certificates &&
				onboardingMentor.certificates.some(
					(cert) =>
						cert.institution.toLowerCase() ===
							certificate.institution.toLowerCase() &&
						cert.type === certificate.type &&
						cert.year === certificate.year,
				);
			if (!isDuplicate)
				dispatch(
					setOnboardingMentor({
						...onboardingMentor,
						certificates:
							onboardingMentor.certificates.concat(certificate),
					}),
				);
			setCertificate(initalState);
		}
	};

	const handleRemoveCert = (slug: string) => {
		if (onboardingMentor.certificates) {
			const updatedCerts = onboardingMentor.certificates.filter(
				(cert) => slugify(cert.institution) !== slug,
			);
			dispatch(
				setOnboardingMentor({
					...onboardingMentor,
					certificates: updatedCerts,
				}),
			);
		}
	};

	return (
		<div className="">
			<h1 className="text-sm text-[#B1B1B1] mb-3">
				Professional Certificates
			</h1>
			<div className="flex flex-col gap-4 items-center mb-5">
				{onboardingMentor?.certificates &&
					onboardingMentor.certificates.length >= 1 &&
					onboardingMentor.certificates.map((cert) => {
						const id = slugify(certificate.institution);
						return (
							<div
								key={id}
								className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative animate__animated animate__fadeInUp animate__fastest">
								<div className="col-span-8 grid gap-1">
									<label htmlFor="" className="text-xs">
										Name of Institution
									</label>
									<CustomTextInput
										name="institution"
										id="institution"
										type="text"
										className="text-black"
										readOnly
										value={cert.institution}
										containerProps={{
											className: "border border-zinc-200",
										}}
									/>
								</div>
								<div className="col-span-4 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										Type of Certificate
									</label>
									<CustomTextInput
										name="type_of_certificate"
										id="type_of_certificate"
										type="url"
										className="text-black select-none"
										value={cert.type}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<div className="col-span-4 grid gap-1 relative">
									<label htmlFor="" className="text-xs">
										Year
									</label>
									<CustomTextInput
										name="year"
										id="year"
										type="text"
										className="text-black select-none"
										value={cert.year}
										containerProps={{
											className: "border border-zinc-200",
										}}
										readOnly
									/>
								</div>
								<span
									onClick={() => {
										handleRemoveCert(id);
									}}
									className="col-span-8 text-center bottom-2 w-full hover:bg-rose-800 duration-500 rounded text-white p-1 bg-rose-600 px-4 right-3 cursor-pointer z-10">
									Remove
								</span>
							</div>
						);
					})}
			</div>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3">
				<div className="col-span-8 grid gap-1">
					<CustomTextInput
						name="institution"
						id="institution"
						type="text"
						value={certificate.institution}
						placeholder="Name of Institution"
						className="text-black"
						onChange={(e) =>
							setCertificate({
								...certificate,
								institution: e.target.value,
							})
						}
						containerProps={{
							className: "border border-zinc-200",
						}}
					/>
				</div>
				<div className="col-span-4 grid gap-1 relative">
					<CustomTextInput
						name="type"
						id="type"
						type="text"
						className="text-black select-none"
						value={certificate.type}
						placeholder="Type of Certificate"
						containerProps={{
							className: "border border-zinc-200",
						}}
						onChange={(e) =>
							setCertificate({
								...certificate,
								type: e.target.value,
							})
						}
					/>
				</div>
				<div className="col-span-4 grid gap-1 relative">
					<CustomTextInput
						name="year"
						id="year"
						type="text"
						className="text-black cursor-pointer select-none"
						placeholder="Year"
						value={certificate.year}
						containerProps={{
							className: "border cursor-pointer border-zinc-200",
						}}
						readOnly
						onClick={() => {
							setCalendarIsOpen(!calendarIsOpen);
						}}
					/>
					{calendarIsOpen && (
						<div className="absolute right-0 top-16">
							<Calendar
								onChange={(props) => {
									const date = new Date(
										props as Date,
									).toLocaleDateString();
									setCertificate({
										...certificate,
										year: date,
									});
									setCalendarIsOpen(false);
								}}
								maxDate={new Date()}
							/>
						</div>
					)}
				</div>
			</div>
			<div
				className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer"
				onClick={() => handleAddCert()}>
				<span className="text-2xl">+</span>
				<p className="">Add New Certificate</p>
			</div>
		</div>
	);
};

export default Certificates;
