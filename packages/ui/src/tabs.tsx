"use client";

import { clsx } from "clsx";
import { atom } from "jotai";
import { createIsolation } from "jotai-scope";
import { useCallback, useEffect, useId, type ComponentProps } from "react";

const { Provider, useAtom, useAtomValue } = createIsolation();

const tabsAtom = atom("");
const tabsIdAtom = atom("");
const tabsTitleIdAtom = atom("");

const createTabId = (id: string, value: string) => `${id}-${value}`;

interface TabsRootProps extends ComponentProps<"div"> {
	title: string;
	defaultValue: string;
}

function TabsRoot({
	className,
	children,
	title,
	defaultValue,
	...attrs
}: TabsRootProps) {
	const id = useId();
	const tabsTitleId = useId();

	return (
		<Provider
			initialValues={
				[
					[tabsAtom, defaultValue],
					[tabsIdAtom, id],
					[tabsTitleIdAtom, tabsTitleId],
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				] as any
			}
		>
			<div className={clsx("ui-flex ui-flex-col", className)} {...attrs}>
				<span className="ui-sr-only" id={tabsTitleId}>
					{title}
				</span>
				{children}
			</div>
		</Provider>
	);
}

interface TabsListProps extends ComponentProps<"div"> {}

function TabsList({ className, ...attrs }: TabsListProps) {
	const tabsTitleId = useAtomValue(tabsTitleIdAtom);

	return (
		<div
			className={clsx("ui-flex ui-gap-1 ui-pb-1", className)}
			role="tablist"
			aria-orientation="horizontal"
			aria-labelledby={tabsTitleId}
			{...attrs}
		/>
	);
}

interface TabsTriggerProps extends ComponentProps<"button"> {
	value: string;
}

function TabsTrigger({ className, value, ...attrs }: TabsTriggerProps) {
	const tabsId = useAtomValue(tabsIdAtom);
	const [tab, setTab] = useAtom(tabsAtom);

	const id = createTabId(tabsId, value);

	const active = tab === value;

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const key = event.key;

			if (!["ArrowLeft", "ArrowRight"].includes(key)) return;
			event.preventDefault();

			const target = window.document.getElementById(id);

			if (key === "ArrowLeft") {
				const previous = target?.previousElementSibling as HTMLElement;
				const previousValue = previous?.getAttribute("data-value");

				if (previous && previousValue) {
					setTab(previousValue);
					previous.focus();
				}
			}

			if (key === "ArrowRight") {
				const next = target?.nextElementSibling as HTMLElement;
				const nextValue = next?.getAttribute("data-value");

				if (next && nextValue) {
					setTab(nextValue);
					next.focus();
				}
			}
		},
		[id, setTab],
	);

	const handleFocus = useCallback(() => {
		window.document.addEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	const handleBlur = useCallback(() => {
		window.document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		return () => {
			handleBlur();
		};
	}, [handleBlur]);

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
			onFocus={handleFocus}
			onBlur={handleBlur}
			type="button"
			role="tab"
			aria-selected={active}
			tabIndex={active ? undefined : -1}
			id={id}
			data-value={value}
			{...attrs}
		/>
	);
}

interface TabsContentProps extends ComponentProps<"div"> {
	value: string;
}

function TabsContent({ className, value, ...attrs }: TabsContentProps) {
	const tabsId = useAtomValue(tabsIdAtom);
	const tab = useAtomValue(tabsAtom);

	const id = createTabId(tabsId, value);

	if (tab !== value) return null;

	return (
		<div
			className={clsx(
				"ui-w-full ui-p-2 ui-border ui-border-solid ui-border-neutral-800 ui-rounded",
				className,
			)}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
			tabIndex={0}
			aria-labelledby={id}
			{...attrs}
		/>
	);
}

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});
