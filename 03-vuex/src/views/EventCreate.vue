<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  computed: mapState(['user', 'categories'])
}
</script>

<style scoped>
ul {
  width: 25%;
  text-align: left;
  margin: 0 auto;
}

li{
  margin-left: 150px;
}
</style>