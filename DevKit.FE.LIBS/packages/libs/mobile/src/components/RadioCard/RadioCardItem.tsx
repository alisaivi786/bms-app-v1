import { Pressable, Text, View } from 'react-native';
import { SfCheckmarkCircleFillIcon } from '@devkit/icons/native';
import { ComponentSize, RadioCardOption, RadioCardVariant } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import classNames from './RadioCard.styles';

type RadioCardItemProps = {
	option: RadioCardOption<number | string>;
	groupName: string;
	value: number | string | undefined;
	hasErrors: boolean;
	onClick: (option: RadioCardOption<number | string>) => void;
	dir: 'col' | 'row';
	size?: ComponentSize;
	variant?: RadioCardVariant;
};

export const RadioCardItem = ({
	option,
	value,
	hasErrors,
	onClick,
	size,
	dir,
	variant = 'primary',
}: RadioCardItemProps) => {
	const { tw, isRtlLocale, reverseLayout } = useMobileUIConfigOptions();
	const isCheckmarksVariant = variant === 'checkmarks';

	const handleClick = () => onClick(option);

	return (
		<Pressable
			key={option.id}
			style={({ pressed }) =>
				tw`${classNames.cardContainer(
					value === option.id,
					option.className,
					hasErrors,
					dir,
					size,
					option?.disabled,
					variant
				)} ${pressed ? 'opacity-60' : ''}`
			}
			disabled={option?.disabled || value === option.id}
			onPress={handleClick}
		>
			<View style={tw`${classNames.content(reverseLayout, option?.center, variant)}`}>
				<View style={tw`${classNames.rightContent(reverseLayout)}`}>
					{option.iconStart && <option.iconStart style={tw`${classNames.icon(size, variant, value === option.id)}`} />}
					<View>
						<Text style={tw`${classNames.label(isRtlLocale, variant, value === option.id, dir)}`}>{option.label}</Text>
						{option.placeholder && (
							<Text style={tw`${classNames.placeholder(isRtlLocale, variant, value === option.id)}`}>
								{option.placeholder}
							</Text>
						)}
					</View>
				</View>
				{isCheckmarksVariant && (
					<SfCheckmarkCircleFillIcon style={tw`${classNames.checkmarkIcon(value === option.id)}`} />
				)}
				{!isCheckmarksVariant && option.iconEnd && (
					<option.iconEnd style={tw`${classNames.icon(size, variant, value === option.id)}`} />
				)}
			</View>
		</Pressable>
	);
};
