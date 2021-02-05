<template>
  <div id="nav">
    <router-link to="/" class="brand">Real World Events</router-link>
    <nav>
      <router-link :to="{ name: 'event-list' }">List</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link>
    </nav>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
#nav {
  width: 500px;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#nav a {
  font-weight: bold;
  color: blueviolet;
}
#nav a.router-link-exact-active {
  color: black;
  text-decoration: none;
}
.brand {
  color: blueviolet;
  font-size: 42px;
  text-align: left;
  text-decoration: none;
}
#nav brand a {
   color: blueviolet;
}
#nav brand a.router-link-exact-active {
  color: blueviolet;
}
</style>