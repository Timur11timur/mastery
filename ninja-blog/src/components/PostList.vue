<template>
  <div class="post-list">
    <div v-for="post in posts">
      <SinglePost :post="post"></SinglePost>
    </div>
  </div>
</template>

<script>
import SinglePost from '@/components/SinglePost.vue'
export default {
  name: "PostList",
  props: ['posts'],
  components: {
    SinglePost
  },
  setup(props) {
    console.log(props.posts)
  }
}
</script>

<style scoped>

</style>