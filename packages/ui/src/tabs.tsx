"use client";

import { clsx } from "clsx";
import { atom } from "jotai";
import { createIsolation } from "jotai-scope";
import type { ComponentProps } from "react";

const { Provider, useAtom, useAtomValue } = createIsolation();

const tabsAtom = atom("");

interface TabsRootProps extends ComponentProps<"div"> {
	defaultValue: string;
}

function TabsRoot({
	className,
	children,
	defaultValue,
	...attrs
}: TabsRootProps) {
	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<Provider initialValues={[[tabsAtom, defaultValue]] as any}>
			<div className={clsx("ui-flex ui-flex-col", className)} {...attrs}>
				{children}
			</div>
		</Provider>
	);
}

interface TabsListProps extends ComponentProps<"div"> {}

function TabsList({ className, ...attrs }: TabsListProps) {
	return (
		<div
			className={clsx(
				"ui-flex ui-gap-1 ui-border-b ui-border-solid ui-border-neutral-700 ui-pb-1",
				className,
			)}
			{...attrs}
		/>
	);
}

interface TabsTriggerProps extends ComponentProps<"button"> {
	value: string;
}

function TabsTrigger({ className, value, ...attrs }: TabsTriggerProps) {
	const [tab, setTab] = useAtom(tabsAtom);

	const active = tab === value;

	return (
		<button
			className={clsx(
				"ui-border ui-border-solid ui-border-neutral-800 ui-py-1 ui-px-3 ui-rounded ui-flex-grow ui-text-sm hover:ui-bg-neutral-800/30 hover:ui-border-neutral-700",
				{
					"ui-bg-neutral-900 hover:ui-bg-neutral-900": active,
				},
				className,
			)}
			onClick={() => setTab(value)}
			type="button"
			data-active={active}
			{...attrs}
		/>
	);
}

interface TabsContentProps extends ComponentProps<"div"> {
	value: string;
}

function TabsContent({ className, value, ...attrs }: TabsContentProps) {
	const tab = useAtomValue(tabsAtom);

	if (tab !== value) return null;

	return <div className={clsx("ui-w-full ui-p-2", className)} {...attrs} />;
}

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});
