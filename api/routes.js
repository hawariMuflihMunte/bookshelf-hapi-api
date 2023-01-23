
const {
	addBook,
	getAllBooks,
	warning,
	getBookById,
	editBook,
	deleteBook,
} = require('./handler/handler');

const routes = [
	{
		method: '*',
		path: '/',
		handler: warning,
	},
	{
		method: 'POST',
		path: '/books',
		handler: addBook,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooks,
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: getBookById,
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: editBook,
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: deleteBook,
	},
];

module.exports = routes;
