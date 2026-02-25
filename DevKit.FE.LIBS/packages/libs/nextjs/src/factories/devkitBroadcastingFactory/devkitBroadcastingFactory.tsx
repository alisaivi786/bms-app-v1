import { ReactNode, createContext, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@devkit/utilities';

interface ProviderProps {
	children: ReactNode;
	broadcastChannelName?: string;
}

interface IBroadcastContext<T extends { type: string; payload?: unknown }> {
	postMessage: (message: T) => void;
	messagesSubscribe: (handler: (message: T) => void) => () => void;
}

const communication: {
	channel?: BroadcastChannel | undefined;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handlers: Map<string, (message: any) => void>;
} = {
	handlers: new Map(),
};

const msgRef = uuidv4();

export class devkitBroadcastingFactory<T extends { type: string; payload?: unknown }> {
	private broadcasting = createContext<IBroadcastContext<T>>({
		postMessage: () => undefined,
		messagesSubscribe: () => () => undefined,
	});

	/**
	 * Broadcast a new messages
	 */
	postMessageUtil = (message: T) => {
		logger.info('[devkitBroadcastingFactory] message will be posted', {
			channel: communication.channel,
			message,
		});

		communication.channel?.postMessage?.({ ...message, msgRef });
	};

	BroadcastProvider = ({ children, broadcastChannelName }: ProviderProps) => {
		useEffect(() => {
			logger.info('[devkitBroadcastingFactory] initiate channel');

			if (!communication.channel && typeof window !== 'undefined') {
				communication.channel = new BroadcastChannel(broadcastChannelName ?? 'e00c7bc9-f494-46db-8e82-a7e791e4f110');

				communication.channel.onmessage = (message) => {
					// msgReg used to avoid infinite loop
					logger.info('[devkitBroadcastingFactory] message received ', {
						message,
						windowMsgRef: msgRef,
					});

					if (!!message.data?.msgRef && message.data?.msgRef !== msgRef && message.data?.type) {
						logger.info('[devkitBroadcastingFactory] will be sent to handlers', {
							handlers: communication.handlers,
						});
						communication.handlers.forEach((handler) => handler(message.data));
					}

					logger.info('[devkitBroadcastingFactory] channel initiated');
				};
			}

			// clean communication channel
			return () => {
				communication.channel?.close();
				communication.channel = undefined;
				communication.handlers = new Map();

				logger.info('[devkitBroadcastingFactory] channel closed');
			};
		}, []);

		return (
			<this.broadcasting.Provider
				value={{
					messagesSubscribe: (handler: (message: T) => void) => {
						const id = uuidv4();

						communication.handlers.set(id, handler);

						return () => {
							communication.handlers.delete(id);
						};
					},

					/**
					 * Broadcast a new messages
					 */
					postMessage: this.postMessageUtil,
				}}
			>
				{children}
			</this.broadcasting.Provider>
		);
	};

	/**
	 * Hook to listen to the broadcast messages
	 */
	useBroadcastingMessages = () => {
		const { messagesSubscribe, postMessage } = useContext(this.broadcasting);

		return { messagesSubscribe, postMessage };
	};
}
