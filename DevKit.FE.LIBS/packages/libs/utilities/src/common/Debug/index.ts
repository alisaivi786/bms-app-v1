/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
	 * Showing the log level that is currently being used
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

const loggerDefaults: ILogger = {
	level: 'local',
	debug: console.debug.bind(console),
	info: console.info.bind(console),
	log: console.log.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console),
};

const logger = globalThis.njDebug ?? loggerDefaults;

export { logger };
