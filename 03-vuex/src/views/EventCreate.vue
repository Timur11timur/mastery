<template>
  <div>
    <h1>Create Event, {{ userName }} ({{ userId }})</h1>
    <p>This event was created by {{ user.name }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>Sure {{ categoryLength }} categories</p>
    <hr>
    <p>{{ getTodo(1) }}</p>
    <p>{{ getTodoById(2) }}</p>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  // computed: {
  //     userName() {
  //       return this.$store.state.user.name
  //     },
  //     userId() {
  //       return this.$store.state.user.id
  //     }
  //   }

  // computed: mapState({
  //userSurname: state => state.user.surname,
  //categories: state => state.categories
  // })

  // computed: mapState({
  //     user: 'user',
  //     categories: 'categories'
  // })
  //The same like above
  //computed: mapState(['user', 'categories'])

  computed: {
    userName() {
      return this.$store.state.user.name
    },
    userId() {
      return this.$store.state.user.id
    },
    ...mapState(['user', 'categories']),
    catLength() {
      return this.$store.state.categories.length
    },
    categoryLength() {
      return this.$store.getters.categoryLength
    },
    getTodo() {
      return this.$store.getters.getTodoById
    },
    ...mapGetters(['getTodoById']),
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
ul {
  width: 25%;
  text-align: left;
  margin: 0 auto;
}
li {
  margin-left: 200px;
}
</style>