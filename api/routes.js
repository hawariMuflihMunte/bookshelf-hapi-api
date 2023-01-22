/* eslint-disable no-unreachable */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const routes = [{
        method: 'GET',
        path: '/',
        handler(request, h) {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler(request, h) {
            return `Halaman tidak dapat diakses dengan method ${request.method.toUpperCase()}.\nCoba akses dengan method GET`;
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler(request, h) {
            return 'About Page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler(request, h) {
            return `Halaman tidak dapat diakses dengan method ${request.method.toUpperCase()}.\nCoba akses dengan method GET`;
        },
    },
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler(request, h) {
            const {name = 'stranger'} = request.params;
            const {lang = 'id'} = request.query;

            switch (lang) {
                case 'en':
                    return `Hi, ${name}`;
                    break;
                case 'jp':
                    return `ハイ, ${name}`;
                    break;
                default:
                    return `Hai, ${name}`;
                    break;
            }
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler(request, h) {
            const {username, password} = request.payload;
            return `Selamat datang, ${username}`;
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler(request, h) {
            return 'Halaman tidak ditemukan';
        },
    }];

module.exports = routes;
