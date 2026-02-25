import { ReactNode } from 'react';
import { PortalProvider } from '@gorhom/portal';

export const devkitPortalProvider = ({ children }: { children: ReactNode }) => (
	<PortalProvider>{children}</PortalProvider>
);
