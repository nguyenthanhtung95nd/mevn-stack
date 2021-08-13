<template>
    <div>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <h3>Create Book</h3>
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="book.title" type="text" class="form-control" id="title" name="title" placeholder="Title" />
            </div>
            <div class="form-group">
                <label for="body">Body</label>
                <textarea placeholder="Body" class="form-control" v-model="book.body" name="body" id="body" cols="30" rows="10"></textarea>
            </div>
            <div class="form-group">
                <label for="due-date">Due Date</label>
                <input name="due-date" v-model="book.dueDate" type="date" class="form-control" id="due-date" placeholder="Due Date" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as bookService from '../../services/BookService'

    export default {
        name: 'book-create',
        data: function() {
            return {
                book: {
                    title: '',
                    body: '',
                    dueDate: ''
                }
            }
        },
        methods: {
            onSubmit: async function() {
                const request = {
                    book: this.book
                }
                await bookService.createBook(request);
                this.$router.push({ name: 'book-list' });
            }
        }
    }
</script>