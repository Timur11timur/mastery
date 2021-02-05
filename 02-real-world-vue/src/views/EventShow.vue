<template>
  <div>
    <h1>Showing event №{{ id }}</h1>
    <h2>{{ event.title }}</h2>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ['id'],
  data() {
    return {
      event: {}
    }
  },
  created() {
    EventService.getEvent(this.id)
        .then(response => {
          this.event = response.data
        })
        .catch(error => {
          console.log('json-server unavailable. Please run in console: json-server --watch db.json', error.response);
        })
  }
}
</script>