import React, { useMemo, useState } from "react";
import CustomTextInput from "../../../inputs/CustomTextInput";
import Calendar from "react-calendar";
import { IMentorOnboardingState } from "../../../../../../interfaces/mentor.interface";
import { setOnboardingMentor } from "../../../../../../redux/reducers/onboardingSlice";
import { slugify } from "../../../../../../utils";
import { PrimaryButton } from "../../../buttons";
import ActivityIndicator from "../../../loader/ActivityIndicator";
import { toast } from "react-toastify";
import { useModal } from "../../../../../../context/modal.context";
import CalendarModal from "../../../modals/CalendarModal";

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
		organization: "",
		title: "",
		year: "",
	};

	const [certificate, setCertificate] = useState<CertificateType>(existingCert || initalState);
	const { closeModal, openModal } = useModal();

	const isDuplicate = useMemo(() => {
		return (
			certs &&
			certs.some(
				(cert) =>
					cert.organization.toLowerCase() === certificate.organization.toLowerCase() &&
					cert.title === certificate.title &&
					cert.year === certificate.year,
			)
		);
	}, [certs, certificate]);

	const handleCertUpdate = () => {
		const updatedCertificates = [...certs];
		const updatedCertIndex = updatedCertificates.findIndex(
			(cert) =>
				cert.organization.toLowerCase() === existingCert?.organization.toLowerCase() &&
				cert.title === existingCert?.title &&
				cert.year === existingCert?.year,
		);
		if (updatedCertIndex !== -1)
			updatedCertificates[updatedCertIndex] = {
				...updatedCertificates[updatedCertIndex],
				...certificate,
			};
		if (!isDuplicate && !existingCert) {
			if (certificate.organization && certificate.title && certificate.year)
				updatedCertificates.push(certificate);
		}
		if (updateCerts) {
			updateCerts(updatedCertificates);
			!existingCert && setCertificate(initalState);
			existingCert && toast.success("Field updated successfully");
		}
	};
	const handleRemoveCert = () => {
		if (certs && existingCert) {
			const updatedCertificates = certs.filter(
				(cert) =>
					slugify(cert.organization) !== slugify(existingCert.organization) &&
					cert.title !== existingCert.title &&
					existingCert.year !== cert.year,
			);
			if (updateCerts) updateCerts(updatedCertificates);
		}
	};

	const handleOpenCalendarModal = () => {
		openModal(
			<CalendarModal
				onChange={(val) => {
					setCertificate((p) => {
						return { ...p, year: new Date(val as Date).getFullYear().toString() };
					});
					closeModal();
				}}
			/>,
			{
				animate: true,
				closeOnBackgroundClick: true,
			},
		);
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
						name="organization"
						id="organization"
						type="text"
						value={certificate.organization}
						placeholder="Name of Institution"
						className="text-black"
						onChange={(e) =>
							setCertificate({
								...certificate,
								organization: e.target.value,
							})
						}
						containerprops={{
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
						name="cert_type"
						id="cert_type"
						type="text"
						className="text-black select-none"
						value={certificate.title}
						placeholder="Type of Certificate"
						containerprops={{
							className: "border border-zinc-200",
						}}
						onChange={(e) =>
							setCertificate({
								...certificate,
								title: e.target.value,
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
						containerprops={{
							className: "border cursor-pointer border-zinc-200",
						}}
						readOnly
						onClick={handleOpenCalendarModal}
					/>
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
				reEdit &&
				!isDuplicate && (
					<div className="flex justify-end gap-4 items-center w-full">
						<PrimaryButton title={"Update"} className="px-8 p-2 rounded" onClick={handleCertUpdate} />
					</div>
				)
			)}
		</>
	);
};

export default EditCertificateCard;
