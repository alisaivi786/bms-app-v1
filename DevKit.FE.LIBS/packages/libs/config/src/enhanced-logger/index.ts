/* eslint-disable no-console */
import pino from 'pino';

interface LogFn {
	(...message: unknown[]): void;
}

const logKeys = ['local', 'develop', 'production'] as const;

type DebugEnvironment = (typeof logKeys)[number];

type ILogger = {
	/**
	 * For debugging purposes, only will be logged with the local environment
	 */
	debug: LogFn;
	/**
	 * For logging nun-error and non-warning info, will be logged with develop and local environment
	 */
	log: LogFn;
	/**
	 * For logging info, will be logged with the production environment
	 */
	info: LogFn;
	/**
	 * For logging a warnings, will be logged with all environment including the production
	 */
	warn: LogFn;
	/**
	 * For logging a errors, will be logged with all environment including the production
	 */
	error: LogFn;
	/**
	 * Show the current log level that is being used
	 * @enum local,develop, production
	 */
	level: DebugEnvironment;
};

declare global {
	// eslint-disable-next-line no-var
	var njDebug: ILogger;
	// eslint-disable-next-line no-var
	var _njConsole: Console;
}

if (!globalThis._njConsole) {
	globalThis._njConsole = { ...globalThis.console };
}

const validateEnvironmentLevel = (level: string) => {
	if (!logKeys.includes(level as DebugEnvironment)) {
		throw new Error(`log level should be one of theses values '${logKeys.join(',')}'`);
	}
};

const logLevel: DebugEnvironment = (() => {
	if (typeof process != 'undefined' && process.env.LOG_LEVEL) {
		validateEnvironmentLevel(process.env.LOG_LEVEL);

		return process.env.LOG_LEVEL as DebugEnvironment;
	}

	return 'production';
})();

const isFileLoggingEnabled: boolean = (() => {
	if (typeof process != 'undefined' && process.env.ENABLE_FILE_LOGGING) {
		return (process.env.ENABLE_FILE_LOGGING as string) === 'true';
	}

	return false;
})();

const logServiceName = (() => {
	if (typeof process != 'undefined' && process.env.SERVICE_NAME) {
		return process.env.SERVICE_NAME;
	}

	if (isFileLoggingEnabled) throw new Error('SERVICE_NAME environment variable is missing');

	return '';
})();

const createPinoLogger = ({ correlationId, requestId }: { correlationId?: string; requestId?: string }) => {
	return pino(
		{
			messageKey: 'message',
			mixin() {
				return { sn: logServiceName, cor: correlationId, reqId: requestId };
			},
			formatters: {
				level: (label) => {
					return {
						level: label,
					};
				},
			},
		},
		pino.destination({
			dest: './logs/app-json.log',
			sync: true,
			mkdir: true,
		})
	);
};

globalThis.njDebug = {
	level: logLevel,
	debug: console.debug.bind(console),
	info: console.info.bind(console),
	log: console.log.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console),
};

export const initiateLogger = () => {
	(['debug', 'info', 'log', 'warn', 'error'] as const).map((logMethod) => {
		const method = logMethod === 'log' ? 'info' : logMethod;

		globalThis.console[logMethod] = (...args) => {
			if (logLevel === 'production' && ['debug', 'log'].includes(logMethod)) return;

			if (logLevel === 'develop' && ['debug'].includes(logMethod)) return;

			if (isFileLoggingEnabled && typeof window === 'undefined') {
				const logger = createPinoLogger({});

				logger[method](JSON.stringify(args));
			}

			globalThis._njConsole[method](...args);
		};

		globalThis.njDebug[logMethod] = globalThis.console[logMethod].bind(globalThis.console);
	});

	_njConsole.log('Logger initiated');
};

export const createLogger = ({ correlationId, requestId }: { correlationId?: string; requestId?: string }): ILogger => {
	const logger: ILogger = { ...globalThis._njConsole, level: logLevel };

	(['debug', 'info', 'log', 'warn', 'error'] as const).map((logMethod) => {
		const method = logMethod === 'log' ? 'info' : logMethod;

		logger[logMethod] = (...args) => {
			if (logLevel === 'production' && ['debug', 'log'].includes(logMethod)) return;

			if (logLevel === 'develop' && ['debug'].includes(logMethod)) return;

			if (isFileLoggingEnabled && typeof window === 'undefined') {
				const localLogger = createPinoLogger({ correlationId, requestId });

				localLogger[method](JSON.stringify(args));
			}

			globalThis._njConsole[method](...[correlationId, requestId, ...args]);
		};
	});

	return logger;
};
