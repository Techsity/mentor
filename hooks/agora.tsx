import { useState, useEffect, ReactNode, useRef } from "react";
import type { ClientConfig, IAgoraRTCClient } from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProviderPrimitive = dynamic(
	() => import("agora-rtc-react").then(({ AgoraRTCProvider }) => AgoraRTCProvider),
	{
		ssr: false,
	},
);

export default function AgoraRTCProvider(props: { clientConfig: ClientConfig; children?: ReactNode }) {
	const clientConfigRef = useRef<ClientConfig>(props.clientConfig);
	const [client, setClient] = useState<IAgoraRTCClient | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const initSdk = async () => {
				const AgoraRTC = (await import("agora-rtc-react")).default;
				setClient(AgoraRTC.createClient(clientConfigRef.current));
			};
			initSdk();
		}
	}, []);
	return client !== null && <AgoraRTCProviderPrimitive client={client}>{props.children}</AgoraRTCProviderPrimitive>;
}
