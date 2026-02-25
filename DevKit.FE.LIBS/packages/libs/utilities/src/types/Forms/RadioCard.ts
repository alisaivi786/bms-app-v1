import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export type RadioCardVariant = 'primary' | 'checkmarks' | 'filled' | 'filled-gray' | 'filled-dark';

export interface RadioCardOption<TValue extends number | string> {
	/** The card id */
	id: TValue;
	//**The card's label */
	disabled?: boolean;
	label: string;
	//**The card's placeHolder */
	placeholder?: string;
	//**icon displayed at the start of the card if it's provided */
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	//**icon displayed at the end of the card if it's provided */
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
	//**optional className for the card */
	className?: string;
	center?: boolean;
}

export type RadioCardFieldProps<TForm extends FieldValues, TValue extends number | string> = ICommonFieldProps<
	TValue,
	TForm
> & {
	cards: RadioCardOption<TValue>[];
	/** the cards direction, default is row */
	direction?: 'row' | 'col';
	/** The variant of the radio card, default is primary */
	variant?: RadioCardVariant;
	/** The number of columns to display the radio cards in. If not provided, the cards will be displayed in a single row or column based on the direction prop. */
	columnsCount?: number;
};
