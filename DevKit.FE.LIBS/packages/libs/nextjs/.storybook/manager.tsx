import { addons, types } from '@storybook/addons';
import sbTheme from './theme';

const setAddonsConfig = (isRootStoryBook?: boolean) => {
	addons.setConfig({
		theme: sbTheme,
	});

	if (isRootStoryBook) {
		addons.register('locale', () => {
			addons.add('locale', {
				title: 'Locale',
				type: types.TOOL,
				match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
				render: () => {
					const url = new URL(window.location.href);
					const value = url.searchParams
						.get('globals')
						?.split(';')
						?.find((a) => a.includes('locale'))
						?.split(':')?.[1];

					return (
						<select
							placeholder="-- Select Locale --"
							value={value}
							onChange={(e) => {
								const urlsParamsArray = (url.searchParams.get('globals')?.split(';') ?? []).filter(
									(a) => !a.includes('locale:')
								);

								urlsParamsArray.push(`locale:${e.currentTarget.value}`);

								url.searchParams.set('globals', urlsParamsArray.join(';'));

								window.location.href = decodeURIComponent(url.toString());
							}}
						>
							<option value="en">🇦🇪 English</option>
							<option value="ar">🇺🇸 Arabic</option>
						</select>
					);
				},
			});
		});

		addons.register('theme', () => {
			addons.add('theme', {
				title: 'Theme',
				type: types.TOOL,
				match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
				render: () => {
					const url = new URL(window.location.href);
					const value = url.searchParams
						.get('globals')
						?.split(';')
						?.find((a) => a.includes('theme'))
						?.split(':')?.[1];

					return (
						<select
							placeholder="-- Select Theme --"
							value={value}
							onChange={(e) => {
								const url = new URL(window.location.href);

								const urlsParamsArray = (url.searchParams.get('globals')?.split(';') ?? []).filter(
									(a) => !a.includes('theme:')
								);

								urlsParamsArray.push(`theme:${e.currentTarget.value}`);

								url.searchParams.set('globals', urlsParamsArray.join(';'));

								window.location.href = decodeURIComponent(url.toString());
							}}
						>
							<option value="default">Default</option>
							<option value="aber">Aber</option>
							<option value="secureData">secureData</option>
						</select>
					);
				},
			});
		});

		addons.register('logout_button', () => {
			addons.add('logout_button', {
				title: 'Logout',
				type: types.TOOLEXTRA,
				match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
				render: () => {
					return (
						<button
							onClick={() => {
								window.location.href = 'https://devkit.shory.com/internal-apps-auth/logout';
							}}
							style={{ backgroundColor: 'red', border: 'none', color: 'white', padding: '0 1rem' }}
						>
							Logout
						</button>
					);
				},
			});
		});
	}
};

setAddonsConfig();
