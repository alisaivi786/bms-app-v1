import { defaultTheme } from '../../themes';

const spinnerStyle = (
	variant: 'primary' | 'secondary',
	state: 'danger' | 'success' | undefined,
	borderWidth: number,
	size: number
) => [
	{ borderRadius: size / 2 },
	variant === 'primary' &&
		!state && {
			borderTopColor: defaultTheme.colors.brand[600],
			borderLeftColor: defaultTheme.colors.brand[100],
			borderRightColor: defaultTheme.colors.brand[100],
			borderBottomColor: defaultTheme.colors.brand[100],
		},
	variant === 'primary' &&
		state === 'danger' && {
			borderTopColor: defaultTheme.colors.red[100],
			borderLeftColor: defaultTheme.colors.red[500],
			borderRightColor: defaultTheme.colors.red[500],
			borderBottomColor: defaultTheme.colors.red[500],
		},
	variant === 'primary' &&
		state === 'success' && {
			borderTopColor: '#dcfce7',
			borderLeftColor: '#00c951',
			borderRightColor: '#00c951',
			borderBottomColor: '#00c951',
		},
	variant === 'secondary' &&
		!state && {
			borderTopColor: defaultTheme.colors.brand[600],
			borderLeftColor: 'white',
			borderRightColor: 'white',
			borderBottomColor: 'white',
		},
	variant === 'secondary' &&
		state === 'danger' && {
			borderTopColor: '#E23D28',
			borderLeftColor: 'white',
			borderRightColor: 'white',
			borderBottomColor: 'white',
		},
	variant === 'secondary' &&
		state === 'success' && {
			borderTopColor: '#00c951',
			borderLeftColor: 'white',
			borderRightColor: 'white',
			borderBottomColor: 'white',
		},
	!!borderWidth && { borderWidth },
	!!size && {
		width: size,
		height: size,
	},
];

export default {
	spinnerStyle,
};
