import { useEffect, useState } from 'react';
import { isMobile, isMobileOnly, isMobileSafari, isTablet } from 'react-device-detect';

const useDeviceDetect = () => {
	const [deviceInfo, setDeviceInfo] = useState({
		isMobileOrTablet: false,
		isMobile: false,
		isTablet: false,
		isMobileSafari: false,
	});

	useEffect(() => {
		setDeviceInfo({
			isMobileOrTablet: isMobile,
			isMobile: isMobileOnly,
			isTablet,
			isMobileSafari,
		});
	}, []);

	return deviceInfo;
};

export default useDeviceDetect;
