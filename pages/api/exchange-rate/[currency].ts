import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const currency = req.query.currency;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API}/USD`);
		const data = await response.json();
		if (!response.ok) {
			console.log({ ...data });
			return res.status(response.status).json({ message: response.statusText, error: { ...data } });
		}
		return res.status(200).json({ rate: data.rates[currency as any] });
	} catch (error) {
		// return res.status(406).json({ error });
		console.log({ error: JSON.stringify(error) });
		throw error;
	}
}
