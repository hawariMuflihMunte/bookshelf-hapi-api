
const Hapi = require('@hapi/hapi');
const routes = require('./api/routes');

const port = process.env.port || 9000;
const host = '127.0.0.1';

const init = async () => {
	const server = Hapi.server({
		port: port,
		host: host,
	});

	server.route(routes);

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
