import { StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../../src/components/Popover';

const ButtonMeta: Meta<typeof Popover> = {
	title: 'Mobile/Components/Popover',
	component: Popover,
	argTypes: {
		content: { header: 'Hello world', description: 'This is a description' },
	},
	args: {
		content: { header: 'Hello world', description: 'This is a description' },
	},
	decorators: [
		(Story) => (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
					<View style={{ justifyContent: 'flex-start', flex: 1 }}>
						<Popover
							popoverVariant="light"
							content={{
								description: 'Applies only to GCC',
							}}
						/>
					</View>
					<Popover
						popoverVariant="dark"
						content={{
							header: 'Coverage details',
							description: 'Applies only to GCC',
						}}
					/>
					<View style={{ justifyContent: 'flex-end', flex: 1 }}>
						<Popover
							content={
								<View style={{ backgroundColor: 'yellow' }}>
									<Text style={styles.title}>Title</Text>
									<Text style={styles.body}>This is a simple popover</Text>
								</View>
							}
						>
							<View style={styles.infoBadge}>
								<Text style={styles.infoText}>i</Text>
							</View>
						</Popover>
					</View>
				</View>
				<View style={{ justifyContent: 'flex-end', flex: 1 }}>
					<Popover
						popoverVariant="dark"
						defaultPlacement="top"
						content={
							<View style={{ backgroundColor: 'red' }}>
								<Text style={styles.title}>Title</Text>
								<Text style={styles.body}>This is a simple popover</Text>
							</View>
						}
					/>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<Popover popoverVariant="dark" content="<div><p>this is HTML paragraph</p><h2>H2 TITLE</h2></div>" />
				</View>
				<View style={{ justifyContent: 'flex-start', flex: 1 }}>
					<Story />
				</View>
				<View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
					<View style={{ justifyContent: 'flex-start', flex: 1 }}>
						<Popover
							popoverVariant="dark"
							content={
								<View style={{ backgroundColor: 'green' }}>
									<Text style={styles.title}>Title</Text>
									<Text style={styles.body}>This is a simple popover</Text>
								</View>
							}
						/>
					</View>
					<Story />
					<View style={{ justifyContent: 'flex-end', flex: 1 }}>
						<Popover
							popoverVariant="dark"
							content={{
								header: 'Coverage details',
								description:
									'Applies only to GCC adskfjnds kjdnf gjksadnfk jdsnfjksd nfkjdsanf sdanlf kjsadn fjsadknf sadkjn fasjnsadj askdjfh jsadf jdjksajf dksajf djksf jdsahfj ksdahf dsafh iodsafh dsiofh dsifh dsaif hdsif hidsiofh dsoiafh oidsfh iodasf',
							}}
						/>
					</View>
				</View>
			</View>
		),
	],
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoBadge: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#2563eb',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoText: {
		color: 'white',
		fontWeight: '700',
	},
	title: {
		fontWeight: '700',
		marginBottom: 4,
		fontSize: 16,
	},
	body: {
		fontSize: 14,
		color: '#444',
	},
});

export default ButtonMeta;

export const _1Default: StoryObj<typeof Popover> = {
	args: {},
};
