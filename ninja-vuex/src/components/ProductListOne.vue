<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for="product in saleProducts" :key="product.name">
        <span class="name">{{ product.name }} </span>
        <span class="price">{{ product.price }}</span>
      </li>
    </ul>
    <button v-on:click="reducePrice">Reduce Price</button>
    <button v-on:click="reducePriceThroughAction">Reduce Pricer Through Action</button>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    saleProducts() {
      return this.$store.getters.saleProducts;
    }
  },
  methods: {
    reducePrice: function (){
      this.$store.commit('reducePrice');
    },
    reducePriceThroughAction: function (){
      this.$store.dispatch('reducePrice');
    }
  }
}
</script>

<style scoped>
</style>
