<template>
  <div class="p-5">
    <h5 style="color:grey;letter-spacing:10px"><strong>Список книг</strong></h5>
    <hr/>
    <div id="tablesection"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "BookList",
  data() {
    return {};
  },
  mounted() {
    this.getBookList();

  },
  methods: {
    getBookList() {
      document.getElementById('tablesection').innerHTML = ""
      document.getElementById('tablesection').innerHTML = `<table id="booklist" style="width:100%"></table>`
      var _this = this
      axios
          .get("https://festive-available-bagel.glitch.me/books")
          .then(function (response) {
            console.log(response.data);

            let tableHeaders = [
              {
                data: "book_id",
                title: "id",
              },
              {
                data: "book_name",
                title: "Название",
              },
              {
                data: "book_edition",
                title: "isbn",
              },
              {
                data: "book_department",
                title: "Издательсво",
              },
              {
                data: "available_copies",
                title: "Доступное кол-во",
              },
              {
                data: "issued_copies",
                title: 'Выдано',
              },
              {
                data: "total_books",
                title: "Всего книг",
              },
              {
                data: "id",
                title: "Удалить книгу",
                render: function () {
                  return "<i id='delete' class='fas fa-trash-alt'></i>"
                }
              }
            ]

            window.$("#booklist").DataTable({
              data: response.data,
              columns: tableHeaders,
              language: {
                url: "//cdn.datatables.net/plug-ins/1.10.18/i18n/Russian.json"
              },
            })

            window.$("#booklist").on('click', '#delete', function () {
              var table = window.$('#booklist').DataTable();
              var data = table.row(window.$(this).closest('tr')).data()
              console.log(data)
              _this.deleteBook(data.id)
            })


          })
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteBook(id) {
      var _this = this
      axios.delete('https://festive-available-bagel.glitch.me/books/' + id)
          .then(function () {
            alert("Книга удалена")
            _this.getBookList()
          })
          .catch(function () {
            alert("Книга не удалена")
          })
    }
  },
};
</script>
<style></style>
