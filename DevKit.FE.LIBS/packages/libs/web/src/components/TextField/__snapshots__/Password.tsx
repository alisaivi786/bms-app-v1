import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@devkit/icons/web';

export const PasswordIcon = ({ inputRef }: { inputRef: React.MutableRefObject<HTMLInputElement | null> }) => {
	const [renderIndex, setRenderIndex] = useState(0);
	const showOrHidePassword = () => {
		setRenderIndex(new Date().getTime());

		if (inputRef.current) {
			if (inputRef.current.type === 'password') {
				inputRef.current.type = 'text';
			} else if (inputRef.current.type === 'text') inputRef.current.type = 'password';
		}
	};

	if (inputRef?.current && inputRef.current.type === 'password') {
		return (
			<div
				key={`${renderIndex}--hide`}
				className="absolute h-full flex cursor-pointer items-center end-4"
				onClick={showOrHidePassword}
			>
				<EyeSlashIcon className="!w-5 text-gray-500 hover:text-gray-400" />
			</div>
		);
	} else {
		return (
			<div
				key={`${renderIndex}--show`}
				className="absolute h-full flex cursor-pointer items-center end-4"
				onClick={showOrHidePassword}
			>
				<EyeIcon className="!w-5 text-gray-500 hover:text-gray-400" />
			</div>
		);
	}
};
