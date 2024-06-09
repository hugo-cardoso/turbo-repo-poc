import { Card } from "@repo/ui/card";

export default function Page(): JSX.Element {
	return (
		<div className="w-dvw h-dvh grid place-items-center">
			<Card title={process.env.NEXT_PUBLIC_APP_NAME || ""} href="#">
				Edit and save to test HMR
			</Card>
		</div>
	);
}
