import { ComponentPopoverVariantType, TwLayout } from '@devkit/utilities';
import { FormFieldErrors } from '../../FormFieldErrors';
import { FormInputGroup } from '../../FormInputGroup';
import textFieldStyles from '../../TextField/TextField.styles';

type PaymentFormInputGroupProps = {
	label: string;
	inputName?: 'card-number-frame' | 'expiry-date-frame' | 'cvv-frame';
	errors: string[] | string;
	isFocus: boolean;
	isTouched: boolean;
	image?: {
		name: string | undefined;
		alt: string | undefined;
	};
	popover?:
		| React.ReactNode
		| {
				header: string;
				description: string;
		  };
	popoverVariant?: ComponentPopoverVariantType;
	layoutClassName?: TwLayout;
};

const PaymentFormInputGroup: React.FC<PaymentFormInputGroupProps> = ({
	label,
	inputName,
	errors,
	popover,
	image,
	isFocus,
	isTouched,
	popoverVariant,
	layoutClassName,
}) => {
	const hasErrors = isTouched && errors.length > 0 && errors[0] != '';

	return (
		<FormInputGroup
			label={label}
			popover={popover}
			popoverVariant={popoverVariant}
			reserveLabelSpacing
			layoutClassName={layoutClassName}
		>
			<div className={textFieldStyles.paymentInput(isFocus, hasErrors)} dir="ltr">
				<div className={inputName} />
				{image?.name && (
					<div className={textFieldStyles.paymentIcon}>
						<img
							src={`https://cdn.shory.com/static/common/payment-cards/${image?.name
								?.toLowerCase()
								.replace(/\s+/g, '-')}.svg`}
							alt={image.alt || ''}
							className="h-4"
						/>
					</div>
				)}
			</div>
			{isTouched && <FormFieldErrors errors={errors} />}
		</FormInputGroup>
	);
};

export default PaymentFormInputGroup;
