<template>
  <div class="about">
    <transition
        appear
        name="fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
    >
      <h1>About</h1>
    </transition>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aperiam officia possimus delectus inventore quod quisquam culpa voluptas iusto, quae maiores quo dolorum, corporis laboriosam a dolore consequatur assumenda nam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aperiam officia possimus delectus inventore quod quisquam culpa voluptas iusto, quae maiores quo dolorum, corporis laboriosam a dolore consequatur assumenda nam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aperiam officia possimus delectus inventore quod quisquam culpa voluptas iusto, quae maiores quo dolorum, corporis laboriosam a dolore consequatur assumenda nam!</p>
  </div>
</template>

<script>

export default {
  setup() {
    const beforeEnter = () => {

    }

    const enter = () => {

    }

    const afterEnter = () => {

    }

    return { beforeEnter, enter, afterEnter }
  }
}
</script>

<style>
  .about {
    max-width: 600px;
    margin: 20px auto;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 3s ease;
  }
</style>