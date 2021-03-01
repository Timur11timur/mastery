<template>
  <div class="post-list">
    <div v-for="post in posts">
      <h3>{{ post.title }}</h3>

    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: ['posts'],
  setup(props) {
    console.log(props.posts)
  }
}
</script>

<style scoped>

</style>