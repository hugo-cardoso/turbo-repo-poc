import { Card } from "@repo/ui/card";
import { Tabs } from "@repo/ui/tabs";

function App() {
	return (
		<div className="w-dvw h-dvh grid place-items-center">
			<div className="flex flex-col gap-2">
				<h1>{import.meta.env.VITE_APP_NAME}</h1>
				<Card
					title="Public App"
					href="https://turbo-repo-public.hcardoso.com.br/"
					target="_blank"
				>
					Go to the public app
				</Card>
				<Card title="Logged App" href="/" target="_blank">
					Go to the logged app
				</Card>
				<Tabs defaultValue="tab1">
					<Tabs.List>
						<Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
						<Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
					<Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
				</Tabs>
			</div>
		</div>
	);
}

export default App;
