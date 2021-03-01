<template>
  <div class="home">
   <h1>Home</h1>
    <PostList :posts="posts"></PostList>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import { ref } from 'vue'

export default {
  name: 'Home',
  components: { PostList },
  setup() {
    const posts = ref ([
      {title: 'welcome to the blog', body: 'Lorem ipsum', id: 1},
      {title: 'top 5 css tips', body: 'lorem 2 ipsum', id: 2},
    ])

    return { posts }
  }
}
</script>
