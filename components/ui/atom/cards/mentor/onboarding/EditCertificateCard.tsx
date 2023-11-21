import React, { useMemo, useState } from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import Calendar from "react-calendar";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { setOnboardingMentor } from "../../../../../../redux/reducers/features/onboardingSlice";
import { slugify } from "../../../../../../utils";
import { PrimaryButton } from "../../../buttons";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { toast } from "react-toastify";

type CertificateType = IMentorOnboardingState["certificates"][0];

const EditCertificateCard = ({
	reEdit = false,
	updateCerts,
	certs,
	existingCert,
}: {
	reEdit?: boolean;
	existingCert?: CertificateType;
	certs: CertificateType[];
	updateCerts?: (certs: CertificateType[]) => void;
}) => {
	const initalState: CertificateType = {
		institution: "",
		type: "",
		year: "",
	};

	const [certificate, setCertificate] = useState<CertificateType>(
		existingCert || initalState,
	);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const isDuplicate = useMemo(() => {
		return (
			certs &&
			certs.some(
				(cert) =>
					cert.institution.toLowerCase() ===
						certificate.institution.toLowerCase() &&
					cert.type === certificate.type &&
					cert.year === certificate.year,
			)
		);
	}, [certs, certificate]);

	const handleCertUpdate = () => {
		setLoading(true);
		const updatedCertificates = [...certs];
		const updatedCertIndex = updatedCertificates.findIndex(
			(cert) =>
				cert.institution.toLowerCase() ===
					existingCert?.institution.toLowerCase() &&
				cert.type === existingCert?.type &&
				cert.year === existingCert?.year,
		);
		if (updatedCertIndex !== -1)
			updatedCertificates[updatedCertIndex] = {
				...updatedCertificates[updatedCertIndex],
				...certificate,
			};
		if (!isDuplicate && !existingCert) {
			if (certificate.institution && certificate.type && certificate.year)
				updatedCertificates.push(certificate);
		}
		if (updateCerts) {
			updateCerts(updatedCertificates);
			!existingCert && setCertificate(initalState);
			!existingCert && toast.success("Field updated successfully");
		}
		setTimeout(function () {
			setLoading(false);
		}, 1000);
	};
	const handleRemoveCert = () => {
		if (certs && existingCert) {
			const updatedCertificates = certs.filter(
				(cert) =>
					slugify(cert.institution) !==
						slugify(existingCert.institution) &&
					cert.type !== existingCert.type &&
					existingCert.year !== cert.year,
			);
			if (updateCerts) updateCerts(updatedCertificates);
		}
	};
	return (
		<>
			<div className="text-sm grid gap-3 md:grid-cols-8 bg-white border border-[#00D569] p-3 relative pt-8 mt-2">
				<div className="col-span-8 grid gap-1">
					{reEdit && (
						<label htmlFor="" className="text-xs">
							Name of Institution
						</label>
					)}
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
					{reEdit && (
						<label htmlFor="" className="text-xs">
							Type of Certificate
						</label>
					)}
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
					{reEdit && (
						<label htmlFor="" className="text-xs">
							Year
						</label>
					)}
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
						<div className="absolute right-0 top-16 z-30">
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
			{!reEdit && !existingCert ? (
				<div
					className="font-medium flex justify-end gap-1 items-center text-[#B1B1B1] select-none cursor-pointer"
					onClick={handleCertUpdate}>
					<span className="text-2xl">+</span>
					<p className="">Add New Certificate</p>
				</div>
			) : (
				reEdit && (
					<div className="flex justify-end gap-4 items-center w-full">
						<PrimaryButton
							disabled={loading}
							title={"Update"}
							icon={loading ? <ActivityIndicator /> : null}
							className="px-8 p-2 rounded"
							onClick={handleCertUpdate}
						/>
					</div>
				)
			)}
		</>
	);
};

export default EditCertificateCard;
