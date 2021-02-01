var app = new Vue({
	el: '#app',
	data: {
		brand: 'Brand',
		product: 'Socks',
		image: 'images/socks.jpg',
		inventory: 10,
		details: ['10% coton', '80% polyester'],
		inStock: true,
		variants: [
			{
				variantId: 124,
				variantColor: "green",
				variantImg: "images/socks.jpg"
			},
			{
				variantId: 324,
				variantColor: "blue",
				variantImg: "images/socks2.jpg"
			}
		],
		cart: 0
	},
	methods: {
		addToCart: function() {
			this.cart++;
		},
		updateProduct(newImage) { 
			this.image = newImage
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		}
	}
});