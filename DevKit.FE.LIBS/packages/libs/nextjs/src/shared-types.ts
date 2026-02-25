export type NextPageWithLayout = import('next').NextPage & {
	getLayout?: (component: JSX.Element) => JSX.Element;

	/**
	 * Set to true when using two devkit Libraries in one project.
	 * Setting isNewLibrary={true} in the page's index.tsx, we can get this value in _app.tsx from where we can conditionally render the two themes.
	 */
	isNewLibrary?: boolean;
};
