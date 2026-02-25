import { ReactNode } from 'react';
import { EmptyInfoCircleIcon } from '@devkit/icons/web';
import { Collapsible, CollapsiblePanel } from '../Collapsible';
import { Popover } from '../Popover';
import { YesNoToggle } from '../ToggleSwitch';

export interface IQuestionBlockProps {
	/**
	 * React elements to be rendered within the Question collapsible component
	 */
	children: ReactNode;

	/**
	 * Question to be rendered as a string
	 */
	question: string;
	/**
	 * Callback fires when the toggle state changes
	 */
	onChange: (value: boolean) => void;
	/**
	 * Boolean value to open the collapse or not
	 */
	isOpen?: boolean;
	/**
	 * Content to be shown in tooltip
	 */
	popoverContent?:
		| ReactNode
		| {
				header: string;
				description: string;
		  };
	/**
	 * Required to submit the form or not.
	 */
	isRequired?: boolean;

	/**
	 * Label to be shown on Yes toggle
	 */
	yesLabel?: string;
	/**
	 * Label to be shown on No toggle
	 */
	noLabel?: string;
}
const QuestionBlock = ({
	children,
	question,
	onChange,
	isOpen,
	popoverContent,
	isRequired,
	yesLabel = 'Yes',
	noLabel = 'No',
}: IQuestionBlockProps) => {
	return (
		<Collapsible open={isOpen}>
			<div className="border-t md:border-none border-gray-200"></div>
			<section className="p-4 md:border border-gray-300 rounded-md mt-7">
				<section className="block md:flex items-center justify-between">
					<div className="flex items-center">
						<span className="md:font-bold text-paragraph">{question}</span>
						{popoverContent ? (
							<span className="text-gray-600 text-body ml-1 flex items-center">
								<Popover content={popoverContent}>
									<EmptyInfoCircleIcon />
								</Popover>
							</span>
						) : null}
						{isRequired && <span className="text-red-500 font-bold text-body mb-4 ml-2">*</span>}
					</div>
					<div className="w-full md:w-min my-4 md:my-0">
						<YesNoToggle onChange={onChange} value={isOpen} variant="black" yesLabel={yesLabel} noLabel={noLabel} />
					</div>
				</section>
				<CollapsiblePanel>
					<div className="border-t border-gray-200 my-4"></div>
					<div className="pb-4"> {children}</div>
				</CollapsiblePanel>
			</section>
		</Collapsible>
	);
};

export default QuestionBlock;
