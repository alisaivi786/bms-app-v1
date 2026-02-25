import { SearchIcon } from '@devkit/icons/web';
import { ITextFieldProps } from '@devkit/utilities';
import { TextField } from '../TextField';

export type SearchBoxProps = Omit<ITextFieldProps, 'startIcon' | 'isClearable'>;

export const SearchBox = (props: SearchBoxProps) => {
	return (
		<TextField
			isClearable={true}
			startIcon={SearchIcon}
			{...props}
			debounceTimeInMilliseconds={props.debounceTimeInMilliseconds ?? 300}
		/>
	);
};
