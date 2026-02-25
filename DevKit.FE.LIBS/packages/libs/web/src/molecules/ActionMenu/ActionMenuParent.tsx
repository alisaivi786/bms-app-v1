import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';

export type TActionMenuVariant = 'text' | 'outline';

export type TTextSizeVariant = 'md' | 'lg';

export type TLayoutType = 'icon' | 'text';

export type TTextVariant = string | React.ReactElement;

interface IActionMenuParentProps {
	type?: TLayoutType;
	children?: React.ReactNode;
	variant?: TActionMenuVariant;
	textSize?: TTextSizeVariant;
	isMenuOpen?: boolean;
	onClick?: () => void;
	disabled?: boolean;
}

const ActionMenuParent = (props: IActionMenuParentProps) => {
	const { isMenuOpen = false, textSize = 'md', variant = 'outline', onClick, disabled = false, children } = props;

	return (
		<div
			className={`whitespace-nowrap rounded-md  border border-solid nj-border-brand  nj-text-brand
				${!isMenuOpen && variant === 'text' ? '!text-black' : ''}
				${variant === 'text' ? '!text-black' : 'px-4 py-1.5'}
				${disabled ? 'opacity-20' : ''} 
				${textSize === 'lg' ? 'text-h2' : 'text-paragraph'} 
				${variant === 'text' && '!border-none px-0 hover:!nj-text-brand'}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center w-full gap-2 cursor-pointer">
				{children}
				{isMenuOpen ? <ArrowUpIcon height={6} width={12} /> : <ArrowDownIcon height={6} width={12} />}
			</div>
		</div>
	);
};

export default ActionMenuParent;
