const express = require('express');
const path = require('path');

const server = express();

const PORT = process.env.PORT ?? 80;

server.use((req, res, next) => {
	const { path } = req.query;
	const url = req.originalUrl;

	if ((url.toLowerCase() === '/storybook/' || url.toLowerCase() === '/storybook') && !path) {
		res.redirect('/storybook/?path=/docs/web_getting-started-installation--docs');
	} else {
		return next();
	}
});

server.use('/mobile', express.static(path.join(__dirname, 'mobile')));
server.use('/nextjs', express.static(path.join(__dirname, 'nextjs')));
server.use('/utilities', express.static(path.join(__dirname, 'utilities')));
server.use('/api-client', express.static(path.join(__dirname, 'api-client')));
server.use('/web', express.static(path.join(__dirname, 'web')));
server.use('/storybook', express.static(path.join(__dirname, 'storybook')));
server.use(express.static(path.join(__dirname, 'website')));

server.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${PORT}`);
});
