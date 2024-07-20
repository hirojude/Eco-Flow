export {};

declare global {
	/**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
	interface RoutesType {
		name: string;
		layout: string;
		path: string;
		icon: ReactNode; // Use ReactNode for icons that can be JSX elements
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component: React.ComponentType<any>; // ComponentType can be any functional component
		secondary?: boolean;
	}
}

 