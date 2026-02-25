import React from 'react';
import { TouchableOpacity } from 'react-native';
import { EyeIcon, EyeSlashIcon } from '@devkit/icons/native';
import styles from './TextField.styles';

export const PasswordIcon = ({
	disabled,
	showPassword,
	onChangeShowPassword,
}: {
	disabled?: boolean;
	showPassword: boolean;
	onChangeShowPassword: () => void;
}) => {
	if (showPassword) {
		return (
			<TouchableOpacity
				hitSlop={10}
				onPress={(e) => {
					e.stopPropagation();
					e.preventDefault();
					onChangeShowPassword();
				}}
			>
				<EyeIcon height={18} width={18} className={styles.eyeIconStyle(disabled)} />
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				hitSlop={10}
				onPress={(e) => {
					e.stopPropagation();
					e.preventDefault();
					onChangeShowPassword();
				}}
			>
				<EyeSlashIcon  height={18} width={18} className={styles.eyeIconStyle(disabled)} />
			</TouchableOpacity>
		);
	}
};
