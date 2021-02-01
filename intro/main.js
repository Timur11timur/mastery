Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product flex">
			<div class="product-image w-1/3 mx-4 my-2 border">
				<img v-bind:src="image" class="object-contain h-50 w-full" alt="Image">
			</div>inventory

			<div class="product-info mx-2 my-2">
				<h1 :class="{ 'text-blue-500': onSale }" class="text-4xl" v-text="title"></h1>
				<p v-if="inStock > 10">In stock</p>
				<p v-else-if="inStock <=10 && inStock > 0">Almost out of stock</p>
				<p v-else>Out stock</p>
				<p>Shipping: {{ shipping }}</p>
				<ul class="list-disc ml-8">
					<li v-for="detail in details">{{ detail }}</li>
				</ul>
				<div v-for="(variant, index) in variants"
				:key="variant.variantId"
				 class="mt-1 w-10 h-10"
				:style="{ backgroundColor: variant.variantColor }"
				@mouseover="updateProduct(index)">
			</div>
	
			<div class="flex">
				<button v-on:click="addToCart"
				:disable="!inStock"
				:class="{
											'bg-grey-600': !inStock,
											'bg-blue-600 text-white': inStock,
										 }"
				 class="hover:bg-blue-500 border rounded px-2 py-2 my-2">Add to Cart</button>
				<button v-on:click="removeFromCart"
				 class="ml-2 bg-grey-600 hover:bg-grey-600 border rounded px-2 py-2 my-2">Remove one from Cart</button>
			</div>
		</div>
	</div>`,
	data() {
		return {
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
			]
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},
		removeFromCart() {
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
		},
		shipping() {
			if (this.premium) {
				return "Free"
			}
			return 2.99
		}
	}
})


var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
		},
		reduceCart(id) {
			let index = this.cart.indexOf(id);
			if (index > -1) {
				this.cart.splice(index, 1);
			}
		}
	}
});