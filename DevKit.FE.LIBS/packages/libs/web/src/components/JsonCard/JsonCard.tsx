import { useState } from 'react';
import { CopyIcon } from '@devkit/icons/web';
import { IToastProps } from '@devkit/shared-types';
import { formatXml, isStringXml } from '@devkit/utilities';
import { Button } from '../Buttons';
import '../JsonBox/JsonBox.scss';
import { useToast } from '../Toast/ToastContext';

export interface IJsonCardProps {
	/** The Title for the JSON card */
	title?: string;
	/** The subtitle for the JSON card */
	subtitle?: string;
	/** The content to be formatted for the JSON card */
	content: string;
}

export const JsonCard = ({ title, subtitle, content }: IJsonCardProps) => {
	const [isJson, setIsJson] = useState<boolean>();
	const { showSuccess } = useToast();
	let contentObj = '';

	try {
		contentObj = JSON.parse(content);
		!isJson && setIsJson(true);
	} catch (e) {
		contentObj = content;
		isJson && setIsJson(false);

		if (isStringXml(content)) contentObj = formatXml(content);
	}
	const handleCopy = () => {
		navigator.clipboard.writeText(content);

		showSuccess({ title: 'Copied to clipboard!' } as IToastProps);
	};

	return (
		<div className="p-4">
			<div className="form-card shadow">
				<div className="flex justify-between items-center	mb-2 text-paragraph">
					{!!title && <span className="font-bold">{title}</span>}
					{!!subtitle && <span>{subtitle}</span>}

					<Button variant="secondary" iconStart={CopyIcon} onClick={() => handleCopy()}>
						{/* boxSize={8}  */}
						Copy
					</Button>
				</div>
				<div id="errorDetailBody" className="json-document p-3">
					<pre>
						{contentObj && <p className="text-caption1">{isJson ? JSON.stringify(contentObj, null, 3) : contentObj}</p>}
					</pre>
				</div>
			</div>
		</div>
	);
};
