export const isStringXml = (xml: string) => {
	const result = xml.startsWith('<') && xml.endsWith('>');

	return result;
};

export const formatXml = (xml: string) => {
	let formatted = '';
	const reg = /(>)(<)(\/*)/g;

	const xml_temp = xml.replace(reg, '$1\r\n$2$3');
	let pad = 0;

	const xlmArray = xml_temp.split('\r\n');

	xlmArray.forEach((node) => {
		let indent = 0;

		if (node.match(/.+<\/\w[^>]*>$/)) {
			indent = 0;
		} else if (node.match(/^<\/\w/)) {
			if (pad != 0) {
				pad -= 1;
			}
			// eslint-disable-next-line no-useless-escape
		} else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
			indent = 1;
		} else {
			indent = 0;
		}

		let padding = '';

		for (let i = 0; i < pad; i++) {
			padding += '  ';
		}

		formatted += `${padding + node}\r\n`;
		pad += indent;
	});

	return formatted;
};
