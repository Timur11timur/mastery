<template>
  <router-link :to="{ name: 'event-show', params: { id: event.id} }" class="event-link">
    <div class="event-card">
      <p>@{{ event.time }} on {{ event.date }}</p>
      <h4>{{ event.title }}</h4>
      <div class="event-attendees">
        <BaceIcon name="users">@{{ event.attendees.length }} attending</BaceIcon>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>

<style scoped>
h4 {
  color: black;
  font-weight: bold;
  font-size: 32px;
  margin-top: 0;
  margin-bottom: 0;
}
.event-link{
  text-decoration: none;
}
.event-card {
  margin: 0 auto 10px auto;
  width: 400px;
  text-align: left;
  padding: 15px 20px;
  box-shadow: -1px 1px 10px rgba(0,0,0,0.5);
  border-radius: 5px;
}
.event-card:hover {
  box-shadow: -3px 3px 13px rgba(0,0,0,0.4);
  transform: translateX(2px) translateY(-2px);
}
.event-card p:last-child {
  color: grey;
}
.event-card p:first-child {
  color: grey;
}
</style>