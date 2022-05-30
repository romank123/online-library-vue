<template>
  <div class="p-5">
    <h5 style="color:grey;letter-spacing:10px"><strong>Выдать книгу</strong> </h5>
    <hr />
    <div id="issueBookForm"  style="text-align:left">
      <form >
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Выберите студента</label>
          <div class="col-sm-10">
            <select v-model="issueBookData.student_id" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Выбрать...</option>
        <option v-for="student in StudentList" :key="student.id" :value="student.id">{{student.first_name}} {{student.last_name}}</option>
        
      </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Выберете книгу</label>
          <div class="col-sm-10">
            <select v-model="issueBookData.book_id" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Выбрать...</option>
        <option v-for="book in BookList" :key="book.id" :value="book.id">{{book.book_name}}</option>
        
      </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="issueDate" class="col-sm-2 col-form-label">Дата выдачи</label>
          <div class="col-sm-10">
            <input
            v-model="issueBookData.issue_date"
              type="date"
              class="form-control"
              id="issueDate"
             
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="returnBook" class="col-sm-2 col-form-label">Дата возврата</label>
          <div class="col-sm-10">
            <input
            v-model="issueBookData.return_date"
              type="date"
              class="form-control"
              id="returnBook"
              
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="issuedCopies" class="col-sm-2 col-form-label">Выдано шт.</label>
          <div class="col-sm-10">
            <input
            v-model="issueBookData.issued_copies"
              type="number"
              class="form-control"
              id="issuedCopies"
              placeholder="Выдано шт."
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button @click.prevent="updateBook()" type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "IssueBook",
  data() {
    return {
        BookList:null,
        StudentList:null,
        issueBookData:{
            student_id:null,
            book_id:null,
            issue_date:null,
            return_date:null,
            issued_copies:null
        }
    };
  },
  created() {
      this.bookList();
      this.studentList();
  },
  methods: {
      bookList(){
          var _this = this
          axios.get('https://festive-available-bagel.glitch.me/books')
          .then(function(response){
              _this.BookList = response.data
          })
          .catch(function(){

          })
      },
      studentList(){
          var _this = this
          axios.get('https://festive-available-bagel.glitch.me/students')
          .then(function(response){
              _this.StudentList = response.data
          })
          .catch(function(){
              
          })
      },
      updateBook(){
           var _this = this
           var bookList  = _this.BookList

       

     

             var updateBook = {
                id: null,
                book_id: null,
                book_name: null,
                book_edition: null,
                book_department: null,
                available_copies: null,
                issued_copies: null,
                total_books: null
                }

           bookList.forEach(element => {
               if(element.id==_this.issueBookData.book_id){
                  updateBook.id=element.id
                updateBook.book_id=element.book_id
                updateBook.book_name=element.book_name
                updateBook.book_edition=element.book_edition
                updateBook.book_department=element.book_department
                updateBook.available_copies=element.available_copies-1
                updateBook.issued_copies=element.issued_copies+1
                updateBook.total_books=element.total_books
               }
           });

    
          
          axios.put('https://festive-available-bagel.glitch.me/books/'+updateBook.id,updateBook)
          .then(function(){
              _this.isssueBook()
              _this.getStudent()
          })
          .catch(function(){
              
          })
      },
      isssueBook() {
          var issueBookData = this.issueBookData
          axios.post('https://festive-available-bagel.glitch.me/issuedbooks',issueBookData)
          .then(function(){

              alert("Книга выдана")
          })
          .catch(function(){
              alert("ошибка")
          })
      },
      getStudent(){
            var _this = this
            axios.get('https://festive-available-bagel.glitch.me/students/'+_this.issueBookData.student_id)
            .then(function (response) {
             
                
                _this.updateStudent(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateStudent(stuData){
            console.log(stuData)
            stuData.issued_books = stuData.issued_books+1

            var _this = this
            axios.put('https://festive-available-bagel.glitch.me/students/'+_this.issueBookData.student_id,stuData)
            .then(function () {
                alert("Данные по студенту обновлены")
                
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        
  },
};
</script>
<style></style>
