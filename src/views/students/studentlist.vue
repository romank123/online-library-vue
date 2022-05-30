<template>
  <div class="p-5">
    <h5 style="color:grey;letter-spacing:10px"><strong>СПИСОК СТУДЕНТОВ</strong></h5>
    <hr/>
    <div id="tablesection"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "StudentList",
  data() {
    return {};
  },
  mounted() {
    this.getStudentList();

  },
  methods: {
    getStudentList() {
      document.getElementById('tablesection').innerHTML = ""
      document.getElementById('tablesection').innerHTML = `<table id="studentlist" style="width:100%"></table>`
      var _this = this
      axios
          .get("https://festive-available-bagel.glitch.me/students")
          .then(function (response) {
            console.log(response.data);

            let tableHeaders = [
              {
                data: "id",
                title: "id",
              },
              {
                data: "roll_no",
                title: "Рег. номер",
              },
              {
                data: "first_name",
                title: "Имя",
              },
              {
                data: "last_name",
                title: "Фамилия",
              },
              {
                data: "Class",
                title: "Направление",
              },
              {
                data: "division",
                title: "Учебное заведение",
              },
              {
                data: "dues",
                title: 'Дата окончания обучения',
              },
              {
                data: "issued_books",
                title: "Выдано книг",
              },
              {
                data: "roll_no",
                title: "Удалить студента",
                render: function () {
                  return "<i id='delete' class='fas fa-trash-alt'></i>"
                }
              }
            ]

            window.$("#studentlist").DataTable({
              data: response.data,
              columns: tableHeaders,
              language: {
                url: "//cdn.datatables.net/plug-ins/1.10.18/i18n/Russian.json"
              },
            })

            window.$("#studentlist").on('click', '#delete', function () {
              var table = window.$('#studentlist').DataTable();
              var data = table.row(window.$(this).closest('tr')).data()
              console.log(data)
              _this.deleteUser(data.id)
            })


          })
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteUser(id) {
      var _this = this
      axios.delete('https://festive-available-bagel.glitch.me/students/' + id)
          .then(function () {
            alert("студент удален")
            _this.getStudentList()
          })
          .catch(function () {
            alert("студент не удален")
          })
    }
  },
};
</script>
<style></style>
