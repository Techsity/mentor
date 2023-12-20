import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const apiEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL as string;

	try {
		const response = await fetch(apiEndpoint, {
			method: req.method,
			headers: {
				"Content-Type": "application/json",
			},
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
		console.log(JSON.stringify(error));
		console.error("Error forwarding GraphQL request > ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
