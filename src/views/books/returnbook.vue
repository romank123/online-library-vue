<template>
    <div class="p-5">
        <h5 style="color:grey;letter-spacing:10px"><strong>Возврат книги</strong> </h5>
        <hr>
        <form >
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">id студента</label>
          <div class="col-sm-8">
              <input v-model="studentId" type="text" class="form-control" id="studentID">
           
          </div>
          <div class="col-sm-2">
              <button @click="getIssuedBooks" class="btn btn-primary">Получить данные</button>
          </div>
        </div>

        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Выбрать книгу для возврата</label>
          <div class="col-sm-10">
            <select v-model="booktoeturn" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Выбрать...</option>
        <option v-for="book in books" :key="book.id" :value="book.id">{{book.book_name}}</option>
        
      </select>
          </div>
        </div>

       
        

        <div class="form-group row">
          <div class="col-sm-10">
            <button @click.prevent="updateIssuedBookData()" type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"ReturnBook",
    data() {
        return {
            studentId:null,
            issuedBook:null,
            books:[],
            booktoreturn:null
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
       
        getBooks(){
            var issuedBooks = this.issuedBook
            var _this = this
            issuedBooks.forEach(element => {
                axios.get(`https://festive-available-bagel.glitch.me/books?id=`+element.book_id)
                .then(function (response) {

                    console.log(response.data)
                    
                    if (_this.books.find(item=>item.id == element.book_id)) {
                        return
                       
                    }
                    else{
                         _this.books.push(response.data[0])
                    }
                 
            })
            .catch(function (error) {
                console.log(error)
            })
            });
           
        },
        getIssuedBooks(e){
            e.preventDefault();
            
            var _this = this
            axios.get('https://festive-available-bagel.glitch.me/issuedbooks?student_id='+_this.studentId)
            .then(function (response) {
                _this.issuedBook = response.data
                console.log(response.data)
                _this.getBooks()
            })
            .catch(function (error) {
                console.log(error)
            })

        },
        getStudent(){
            var _this = this
            axios.get('https://festive-available-bagel.glitch.me/students/'+_this.studentId)
            .then(function (response) {
                
                _this.updateStudent(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateStudent(stuData){
            var _this = this
            console.log(stuData)
            stuData.issued_books = stuData.issued_books-1

           
            axios.put('https://festive-available-bagel.glitch.me/students/'+_this.studentId,stuData)
            .then(function () {
                alert("Данные по студенты обновлены")
                _this.getBook()
                
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        getBook(){
                  var _this = this
              axios.get('https://festive-available-bagel.glitch.me/books/'+_this.booktoeturn)
            .then(function (response) {
                
                _this.updateBook(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateBook(bookData){
            var _this = this
            bookData.available_copies = bookData.available_copies+1
            bookData.issued_copies = bookData.issued_copies-1

            bookData.total_books = bookData.total_books+1
      
            axios.put('https://festive-available-bagel.glitch.me/books/'+_this.booktoeturn,bookData)
            .then(function () {
                
                alert("Список книг обновлен")
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateIssuedBookData(){
            console.log(this.booktoeturn)

            console.log(this.issuedBook)

            var _this = this

            var issuedBook = this.issuedBook.find(item=>item.book_id == this.booktoeturn);

            console.log(issuedBook.id)

            axios.delete('https://festive-available-bagel.glitch.me/issuedbooks/'+issuedBook.id)
            .then(function () {
                _this.getStudent()
                alert("Книга возвращена")
            })
            
        }
        
    },
}
</script>
<style>

</style>