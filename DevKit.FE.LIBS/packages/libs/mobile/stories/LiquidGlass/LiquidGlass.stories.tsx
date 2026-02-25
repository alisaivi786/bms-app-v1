import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { LiquidGlass as LiquidGlassComponent, LiquidGlassProps } from '../../src/components/LiquidGlass';

type ComponentType = (args: LiquidGlassProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#eee' }}>
			<LiquidGlassComponent {...args}>
				<View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: 'black', textAlign: 'center' }}>Liquid Glass</Text>
				</View>
			</LiquidGlassComponent>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/LiquidGlass',
	component: LiquidGlassComponent,
	render: Template,
};

export default StoryMeta;

export const LiquidGlass: StoryObj<ComponentType> = {
	args: {},
};