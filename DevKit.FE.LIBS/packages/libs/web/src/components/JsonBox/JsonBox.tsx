import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { JsonCard } from '../JsonCard';
import './JsonBox.scss';

export interface IJsonBoxProps {
	/** Optional left title information. */
	titleLeft?: ITitleObj;
	/** Optional right title information. */
	titleRight?: ITitleObj;
	/**
	 * The request information.
	 *
	 * @property {Object} request
	 * @property {string} request.requestDate - The date of the request.
	 * @property {string} request.content - The content of the request.
	 */ request: {
		requestDate: string;
		content: string;
	};
	/**
	 * The response information.
	 *
	 * @property {Object} response
	 * @property {string} response.responseDate - The date of the response.
	 * @property {string} response.content - The content of the response.
	 */ response: { responseDate: string; content: string };
}

interface ITitleObj {
	/** The label for the title. */
	label: string;
	/** The value for the title. */
	value: string;
}

export const JsonBox = ({ titleLeft, titleRight, request, response }: IJsonBoxProps) => {
	const jsonRequest = request;
	const jsonResponse = response;
	const [expand, setExpand] = useState<boolean>(true);

	return (
		<div className="form-card shadow">
			<div className="flex flex-row font-bold ">
				{titleLeft?.label && titleLeft?.value && (
					<div className="w-1/2 pl-4">
						{titleLeft?.label}: {titleLeft?.value}
					</div>
				)}
				{titleRight?.label && titleRight?.value && (
					<div className="w-1/2 pl-6">
						{titleRight?.label}: {titleRight?.value}
					</div>
				)}

				<div className="flex grow justify-end">
					<button onClick={() => setExpand(!expand)}>
						{expand ? <ArrowUpIcon width={20} height={20} /> : <ArrowDownIcon width={20} height={20} />}
					</button>
				</div>
			</div>
			{expand && (
				<div className="flex flex-row">
					<div className="w-6/12">
						{jsonRequest && <JsonCard title={'Request Date: ' + request.requestDate} content={jsonRequest?.content} />}
					</div>
					<div className="w-6/12">
						{jsonResponse && (
							<JsonCard title={'Response Date: ' + response.responseDate} content={jsonResponse?.content} />
						)}
					</div>
				</div>
			)}
		</div>
	);
};
