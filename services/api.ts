import { GraphQLClient } from "graphql-request";
import { ALL_COURSES } from "./graphql/queries/course";
import { AUTH_TOKEN_KEY, supportedCurrencies, ToastDefaultOptions } from "../constants";
import { getCookie } from "../utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { ISOCurrency } from "../interfaces";

const apiEndpoint = "/api/graphql";

export const gqlRequestInstance = (args?: { authToken?: string; ssr?: boolean }) => {
	const { authToken, ssr } = args || {};
	const token = authToken ? authToken : typeof window !== "undefined" && (getCookie(AUTH_TOKEN_KEY) as string);
	// If there's no token, return the original headers
	const headers = {
		Authorization: `Bearer ${token}`,
	};
	const client = new GraphQLClient(ssr ? (process.env.NEXT_PUBLIC_API_BASE_URL as string) : apiEndpoint, {
		headers,
		// cache: "force-cache",
	});

	return client;
};

export const fetchCourses = async (variables?: {
	take?: number;
	skip?: number;
	category?: string;
	courseType?: string;
}) => {
	return await gqlRequestInstance().request(ALL_COURSES, {
		take: Number(20 || variables?.take),
		skip: Number(variables?.skip !== undefined ? variables.skip : 0),
		...variables,
	});
};

export const processExchangeRate = async (curr: ISOCurrency, next: (rate: number) => void) => {
	try {
		const { data } = await axios.get(`/api/exchange-rate/${curr}`);
		if (data.rate) next(data.rate);
	} catch (error) {
		console.error("error while processing exchange: ", { error: JSON.stringify(error) });
		toast.error("Something went wrong. Please try again", { ...ToastDefaultOptions({ id: "error" }) });
	}
};
