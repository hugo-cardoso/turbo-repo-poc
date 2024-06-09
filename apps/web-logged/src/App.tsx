import { Card } from "@repo/ui/card";

function App() {
	return (
		<div className="w-dvw h-dvh grid place-items-center">
			<Card title={import.meta.env.VITE_APP_NAME} href="#">
				Edit and save to test HMR
			</Card>
		</div>
	);
}

export default App;
