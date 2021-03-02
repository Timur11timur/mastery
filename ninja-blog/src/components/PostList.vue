<template>
  <div class="post-list">
    <div v-for="post in posts">
      <SinglePost :post="post"></SinglePost>
    </div>
  </div>
</template>

<script>
import  {onMounted, onUnmounted } from 'vue'
import SinglePost from '@/components/SinglePost.vue'
export default {
  name: "PostList",
  props: ['posts'],
  components: {
    SinglePost
  },
  setup(props) {
    onMounted(() => console.log('component mounted'))
    onUnmounted(() => console.log('component unmounted'))
  }
}
</script>

<style scoped>

</style>