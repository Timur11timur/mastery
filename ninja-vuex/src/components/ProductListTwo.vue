<template>
  <div id="product-list-two">
    <h2>Product List Two</h2>
    <ul>
      <li v-for="product in products" :key="product.name">
        <span class="name">{{ product.name }} </span>
        <span class="price">{{ product.price }}</span>
      </li>
    </ul>
    <button v-on:click="reducePriceFromComponent">Reduce Price From Component</button>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    reducePriceFromComponent: function (){
      this.$store.state.products.forEach(product => {
        product.price -= 1;
      });
    }
  }
}
</script>

<style scoped>
</style>
