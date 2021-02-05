<template>
  <router-link :to="{ name: 'event-show', params: { id: '1'} }" class="event-link">
    <div class="event-card">
      <p>@{{ event.time }} on {{ event.date }}</p>
      <h4>{{ event.title }}</h4>
      <p>@{{ event.attendees.length }} attending</p>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      event: {
        id: 1,
        title: 'Beach Cleanup',
        date: 'Friday Feb 05, 2021',
        time: '6:00',
        attendees: [
          { id: '123', name: 'Dim Dim' },
          { id: '456', name: 'Vlad Vlad' }
        ]
      }
    }
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
  padding: 10px 20px;
  box-shadow: -1px 1px 10px rgba(0,0,0,0.5);
  border-radius: 5px;
}
.event-card:hover {
  box-shadow: -3px 3px 13px rgba(0,0,0,0.4);
  transform: translateX(2px) translateY(-2px);
}
.event-card p:last-child {
  color: grey;
  margin-top: 3px;
}
.event-card p:first-child {
  color: grey;
  margin-bottom: 0;
}

</style>