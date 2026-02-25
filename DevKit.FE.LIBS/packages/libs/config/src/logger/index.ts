/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface LogFn {
	(...message: any[]): void;
}

export type DebugEnvironment = 'local' | 'develop' | 'production';

// This function is used to disable the console
const defaultLogger: LogFn = () => undefined;

globalThis.njDebug = {
	level: 'local',
	debug: console.debug.bind(console),
	info: console.info.bind(console),
	log: console.log.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console),
};

const setDebugEnvironment = (level: DebugEnvironment) => {
	globalThis.njDebug.level = level;

	if (level === 'local') {
		globalThis.njDebug.debug = console.debug.bind(console);
		globalThis.njDebug.info = console.info.bind(console);
	} else if (level === 'develop') {
		globalThis.njDebug.debug = defaultLogger;
		globalThis.njDebug.info = console.info.bind(console);
	} else {
		globalThis.njDebug.log = defaultLogger;
		globalThis.njDebug.debug = defaultLogger;
		globalThis.njDebug.info = defaultLogger;
	}
};

export { setDebugEnvironment };
