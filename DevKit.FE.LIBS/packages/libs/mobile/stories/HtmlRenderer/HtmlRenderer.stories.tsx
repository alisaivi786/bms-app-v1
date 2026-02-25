import { View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { HtmlRenderer } from '../../src/components/HtmlRenderer';

const source =
	'<p>This is a <strong>storybook test</strong> of the <i>HtmlRenderer</i> component.</p><br/>list entry:<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>';

type ComponentType = () => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	return (
		<View style={{ flex: 1 }}>
			<HtmlRenderer source={source} />
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/HtmlRenderer',
	component: HtmlRenderer,
};

export default StoryMeta;

export const Default: StoryObj = {
	render: Template,
};
