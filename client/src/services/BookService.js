import { http } from './HttpService'

export function getAllBooks() {
    return http().get('/book');
}

export function getBookById(id) {
    return http().get(`/book/${id}`);
}

export function createBook(task) {
    return http().post('/book', task);
}

export function deleteBook(id) {
    return http().delete(`/book/${id}`);
}

export function updateBook(task) {
    return http().put('/book', task);
}