<template>
    <div class="d-flex flex-column">
        <h1>Books</h1>

        <div class="mb-4">
            <router-link to="/book/new" class="btn btn-success ml-2" exact>Create Book</router-link>
        </div>

        <div v-if="books && books.length > 0" class="d-flex flex-wrap justify-content-start">

            <div v-for="book in books" v-bind:key="book._id" class="card mb-2 ml-2 text-white bg-dark" style="width: 18rem;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{ book.title }}</h5>
                        <span v-bind:class="{ late: bookIsLate(book.dueDate) && !book.completed}" class="small">{{ book.dueDate
                            | date }}</span>
                    </div>

                    <h6 class="card-subtitle mb-2 text-muted">
                        Created by {{ book.author.username }}
                    </h6>

                    <p class="card-text">{{ book.body }}</p>

                    <div v-if="book.author._id === $store.state.userId" class="form-group form-check">
                        <input type="checkbox" class="form-check-input" :disabled="book.completed" v-model="book.completed" v-on:click="markAsCompleted(book)"
                        />
                        <label for="form-check-label">Completed</label>
                    </div>

                    <div v-if="book.author._id === $store.state.userId" class="d-flex justify-content-between">
                        <router-link type="button" tag="button" class="card-link btn btn-primary" :to="{ name: 'book-update', params: { id: book._id } }"
                            exact>Edit</router-link>
                        <a v-on:click.prevent="currentBookId = book._id" class="card-link btn btn-danger" href="#" v-b-modal.modal1>Delete</a>
                    </div>
                </div>
            </div>

            <div>
                <b-modal id="modal1" ref="modal" centered title="Delete Confirmation">
                    <p class="my-4">Are you sure you would like to delete this book?</p>
                    <div slot="modal-footer" class="w-100 text-right">
                        <b-btn slot="md" class="mr-1" variant="danger" @click="deleteBook">Delete</b-btn>
                        <b-btn slot="md" variant="secondary" @click="cancelModal">Cancel</b-btn>
                    </div>
                </b-modal>
            </div>
        </div>

        <div v-if="books && books.length === 0" class="ml-2">
            <div class="alert alert-info">No books found.</div>
        </div>

    </div>

</template>

<script>

   import * as bookService from '../../services/BookService'
   import moment from 'moment'

    export default {
        name: 'book-list',
        data: function() {
            return {
                books: null,
                currentBookId: null
            }
        },
        beforeRouteEnter(to, from, next) {
            bookService.getAllBooks()
                .then(res => {
                    next(vm => {
                      console.log(res)
                        vm.books = res.data.books;
                    });
                });
        },
        methods: {
            bookIsLate: function(date) {
                return moment(date).isBefore();
            },
            cancelModal: function() {
                this.$refs.modal.hide();
                this.currentBookId = null;
            },
            deleteBook: async function() {
                this.$refs.modal.hide();
                await bookService.deleteBook(this.currentBookId);
                const index = this.books.findIndex(book => book._id === this.currentBookId);
                this.books.splice(index, 1);
                this.currentBookId = null;
            },
            markAsCompleted: function(book) {
                book.completed = true;
                const request = {
                    book: book
                }
                bookService.updateBook(request);
            }
        }
    }
</script>