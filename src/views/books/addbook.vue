<template>
  <div class="p-5">
    <h5 style="color:grey;letter-spacing:10px"><strong>Добавить книгу</strong></h5>
    <hr />
    <div id="bookform" style="text-align:left">
      <form @submit.prevent="addBook()">
        <div class="form-group row">
          <label for="book_id" class="col-sm-2 col-form-label">ID</label>
          <div class="col-sm-10">
            <input
            v-model="book_id"
              type="number"
              class="form-control"
              id="book_id"
              placeholder="Уникальный номер"
                disabled
            />
          </div>
        </div>
         <div class="form-group row">
          <label for="book_name" class="col-sm-2 col-form-label">Название</label>
          <div class="col-sm-10">
            <input
            v-model="book_name"
              type="text"
              class="form-control"
              id="book_name"
              placeholder="Название"
            />
          </div>
        </div>
         <div class="form-group row">
          <label for="book_edition" class="col-sm-2 col-form-label">Дата издания</label>
          <div class="col-sm-10">
            <input
            v-model="book_edition"
              type="date"
              class="form-control"
              id="book_edition"
              placeholder="Дата издания"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="book_department" class="col-sm-2 col-form-label"
            >Издательство</label
          >
          <div class="col-sm-10">
            <input
            v-model="book_department"
              type="text"
              class="form-control"
              id="book_department"
              placeholder="Издательство"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="total_books" class="col-sm-2 col-form-label"
            >Всего книг</label
          >
          <div class="col-sm-10">
            <input
            v-model="total_books"
              type="number"
              class="form-control"
              id="total_books"
              placeholder="Всего книг"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "AddStuddent",
  data() {
    return {
        book_id:Math.floor((Math.random()*100)+1),
        book_name:null,
        book_edition:null,
        book_department:null,
        total_books:null,
        
    };
  },
  mounted() {},
  methods: {
    addBook() {
        var BookData = {
                "id": this.book_id,
                "book_id": this.book_id,
                "book_name": this.book_name,
                "book_edition": this.book_edition,
                "book_department": this.book_department,
                "available_copies": this.total_books,
                "issued_copies": 0,
                "total_books": this.total_books
                }
            console.log(BookData)
            axios.post('https://festive-available-bagel.glitch.me/books',BookData)
            .then(function(){
                alert("Книга добавлена")
            })
            .catch(function(){
                alert("ошибка")
            })

    },
  },
};
</script>
<style></style>
