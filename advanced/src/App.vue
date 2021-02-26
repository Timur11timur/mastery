<template>
  <header class="w-full bg-blue-500 text-white py-4">
    <nav class="w-240 mx-auto p-2 bg-red-500">
        <router-link to="/">Home</router-link> |
        <router-link to="/lesson">Lesson</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
  </header>
  <main class="w-full bg-gray-100 h-full">
    <div class="w-240 mx-auto p-2 bg-red-500">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      lesson: 1
    }
  }
};
</script>

<style>
html, body, #app {
  min-height: 100%;
  height: 100%;
}
</style>