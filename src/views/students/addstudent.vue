<template>
  <div class="p-5">
    <h5 style="color:grey;letter-spacing:10px"><strong>ДОБАВИТЬ СТУДЕНТА</strong></h5>
    <hr />
    <div id="studentform" style="text-align:left">
      <form @submit.prevent="addStudent()">
        <div class="form-group row">
          <label for="firstname" class="col-sm-2 col-form-label">Имя</label>
          <div class="col-sm-10">
            <input
            v-model="firstname"
              type="text"
              class="form-control"
              id="firstname"
              placeholder="Имя"
            />
          </div>
        </div>
         <div class="form-group row">
          <label for="lastname" class="col-sm-2 col-form-label">Фамилия</label>
          <div class="col-sm-10">
            <input
            v-model="lastname"
              type="text"
              class="form-control"
              id="lastname"
              placeholder="Фамилия"
            />
          </div>
        </div>
         <div class="form-group row">
          <label for="rollnumber" class="col-sm-2 col-form-label">Рег. номер</label>
          <div class="col-sm-10">
            <input
            v-model="rollnumber"
              type="text"
              class="form-control"
              id="rollnumber"
              placeholder="Рег. номер"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="class" class="col-sm-2 col-form-label"
            >Направление</label
          >
          <div class="col-sm-10">
            <input
            v-model="student_class"
              type="text"
              class="form-control"
              id="class"
              placeholder="Направление"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="division" class="col-sm-2 col-form-label"
            >Учебное заведение</label
          >
          <div class="col-sm-10">
            <input
            v-model="division"
              type="text"
              class="form-control"
              id="division"
              placeholder="Учебное заведение"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="dues" class="col-sm-2 col-form-label"
          >Год окончания</label
          >
          <div class="col-sm-10">
            <input
                v-model="dues"
                type="text"
                class="form-control"
                id="dues"
                placeholder="Год окончания"
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
        firstname:null,
        lastname:null,
        rollnumber:null,
        student_class:null,
        division:null,
        dues:null
    };
  },
  mounted() {},
  methods: {
    addStudent() {
        var studentData = {
            "id": Math.floor((Math.random()*1000)+1),
            "roll_no": this.rollnumber,
            "first_name": this.firstname,
            "last_name": this.lastname,
            "Class": this.student_class,
            "division": this.division,
            "dues": this.dues,
            "issued_books": 0
            }
            console.log(studentData)
            axios.post('https://festive-available-bagel.glitch.me/students',studentData)
            .then(function(){
                alert("Студент добавлен")
            })
            .catch(function(){
                alert("ошибка")
            })

    },
  },
};
</script>
<style></style>
