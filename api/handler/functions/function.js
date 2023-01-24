
const headerSet = response => {
	const _response = response;

	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', '*');
	response.header('X-Powered-By', 'Hapi');

	return _response;
};

module.exports = headerSet;
