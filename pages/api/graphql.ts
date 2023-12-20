import { NextApiRequest, NextApiResponse } from "next";
import { checkAuthServerSide } from "../../utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = checkAuthServerSide(req) as string;
	try {
		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};
		const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
			method: req.method,
			headers,
			body: JSON.stringify(req.body),
		});

		if (!response.ok) {
			throw new Error(`Error from GraphQL API > ${response.statusText}`);
			// res.status(response.status).json({ error: response.statusText });
			// return;
		}
		const data = await response.json();
		res.status(response.status).json(data);
	} catch (error) {
		// console.error("Error forwarding GraphQL request > ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
