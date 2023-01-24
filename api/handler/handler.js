
const {nanoid} = require('nanoid');
const books = require('../data/books');
const headerSet = require('./functions/function');

const warning = (request, h) => {
	return h.response({
		status: 'warning',
		message: 'Halaman ini tidak dapat diakses!\nSilahkan akses dengan endpoint /books',
	});
};

const addBook = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (name === undefined) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});

		response.code(400);
		headerSet(response);

		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});

		response.code(400);
		headerSet(response);

		return response;
	}

	const id = nanoid(32);
	const finished = pageCount === readPage;

	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const book = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	books.push(book);

	const isSuccess = books.filter(book => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});

		response.code(201);
		headerSet(response);

		return response;
	}

	const response = h.response({
		status: 'error',
		message: 'Buku gagal ditambahkan',
	});

	response.code(500);
	headerSet(response);

	return response;
};

const getAllBooks = (request, h) => {
	const {name, reading, finished} = request.query;

	if (name !== undefined) {
		const booksName = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));

		const response = h.response({
			status: 'success',
			data: {
				books: booksName.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		headerSet(response);

		return response;
	}

	if (reading !== undefined) {
		const booksReading = books.filter(book => Number(book.reading) === Number(reading));

		const response = h.response({
			status: 'success',
			data: {
				books: booksReading.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		headerSet(response);

		return response;
	}

	if (reading !== undefined) {
		const booksFinished = books.filter(book => book.finished === finished);

		const response = h.response({
			status: 'success',
			data: {
				books: booksFinished.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		headerSet(response);

		return response;
	}

	const response = h.response({
		status: 'success',
		data: {
			books: books.map(book => ({
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			})),
		},
	});

	response.code(200);
	headerSet(response);

	return response;
};

const getBookById = (request, h) => {
	const {id} = request.params;

	const book = books.filter(book => book.id === id)[0];

	if (book) {
		const response = h.response({
			status: 'success',
			data: {
				book,
			},
		});

		response.code(200);
		headerSet(response);

		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});

	response.code(404);
	headerSet(response);

	return response;
};

const editBook = (request, h) => {
	const {id} = request.params;

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (name === undefined) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});

		response.code(400);
		headerSet(response);

		return response;
	}

	const index = books.findIndex(book => book.id === id);

	if (index === -1) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Id tidak ditemukan',
		});

		response.code(404);
		headerSet(response);

		return response;
	}

	const finished = pageCount === readPage;
	const updatedAt = new Date().toISOString();

	if (name === '') {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});

		response.code(400);
		headerSet(response);

		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});

		response.code(400);
		headerSet(response);

		return response;
	}

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};

		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
			data: {
				bookId: id,
			},
		});

		response.code(200);
		headerSet(response);

		return response;
	}
};

const deleteBook = (request, h) => {
	const {id} = request.params;

	const index = books.findIndex(book => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);

		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});

		response.code(200);
		headerSet(response);

		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});

	response.code(404);
	headerSet(response);

	return response;
};

module.exports = {
	warning,
	addBook,
	getAllBooks,
	getBookById,
	editBook,
	deleteBook,
};
