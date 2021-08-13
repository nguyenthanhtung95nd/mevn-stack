<template>
  <div>
    <h3>Edit Book</h3>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="book.title"
          type="text"
          class="form-control"
          id="title"
          name="title"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea
          placeholder="Body"
          class="form-control"
          v-model="book.body"
          name="body"
          id="body"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date</label>
        <input
          name="due-date"
          v-model="book.dueDate"
          type="date"
          class="form-control"
          id="due-date"
          placeholder="Due Date"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
 import * as bookService from '../../services/BookService'
import moment from "moment";

export default {
  name: "book-update",
  data: function () {
    return {
      book: {
        title: "",
        body: "",
        dueDate: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    bookService.getBookById(to.params.id).then((response) => {
      if (!response) {
        next("/book");
      } else {
        next((vm) => {
          const book = response.data.book;
          book.dueDate = moment(book.dueDate).format("YYYY-MM-DD");
          vm.book = book;
        });
      }
    });
  },
  methods: {
    onSubmit: async function () {
      const request = {
        book: this.book,
      };
      await bookService.updateBook(request);
      this.$router.push({ name: "book-list" });
    },
  },
};
</script>