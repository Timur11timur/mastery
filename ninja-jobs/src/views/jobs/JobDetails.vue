<template>
  <h1>Job Details Page</h1>
  <p> The job id directly is {{ $route.params.id }}</p>
  <p> The job id through props is {{ id }}</p>
  <p> The job id fom route is {{ idroute }}</p>
</template>

<script>
export default {
  name: "JobDetails",
  props: ['id'],
  data() {
    return {
      idroute: this.$route.params.id
    }
  },
  created() {
    console.log(jobprop)
  }
}
</script>

<style scoped>

</style>