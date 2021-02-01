var app = new Vue({
	el: '#app',
	data: {
		brand: 'Brand',
		selectedVariant: 0,
		product: 'Socks',
		details: ['10% cotton', '80% polyester'],
		variants: [
			{
				variantId: 124,
				variantColor: "gray",
				variantImg: "images/socks.jpg",
				variantQuantity: 11
			},
			{
				variantId: 254,
				variantColor: "orange",
				variantImg: "images/socks2.jpg",
				variantQuantity: 5
			},
			{
				variantId: 324,
				variantColor: "red",
				variantImg: "images/socks3.jpg",
				variantQuantity: 0
			}
		],
		cart: 0
	},
	methods: {
		addToCart: function() {
			this.cart++;
		},
		updateProduct(index) {
			this.selectedVariant = index
		}
	},
	computed: {
		image() {
			return this.variants[this.selectedVariant].variantImg
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		onSale() {
			return this.variants[this.selectedVariant].variantQuantity > 10
		},
		title() {
			let sale = this.onSale ? ' (sale)' : '';
			return this.brand + ' ' + this.product + sale
		}
	}
});