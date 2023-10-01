import React, { FormEvent, useState } from "react";
import CustomTextInput from "../../components/ui/atom/inputs";
import { PrimaryButton } from "../../components/ui/atom/buttons";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { isEmail } from "../../utils";
import ForgotPasswordTemplate from "../../components/templates/auth/password/forgot";

const ForgotPasswordPage = () => {
	return <ForgotPasswordTemplate />;
};

export default ForgotPasswordPage;
