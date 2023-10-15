import React, { FormEvent, useState } from "react";

const useLoginForm = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(function () {
			setLoading(!true);
		}, 2000);
	};
	return { loading, handleSubmit };
};

export default useLoginForm;
