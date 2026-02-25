import React from 'react';
import { EmptyInfoCircleIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts';
import popoverStyles from './Popover.styles';

const PopoverTriggerDefault: React.FC = () => {
	const { tw } = useMobileUIConfigOptions();

	return <EmptyInfoCircleIcon width={15} height={15} style={tw`${popoverStyles.infoIconStyle()}`} />;
};

export default PopoverTriggerDefault;
