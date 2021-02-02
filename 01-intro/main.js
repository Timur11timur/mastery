let eventBus = new Vue();

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div>
			<div class="product flex">
				<div class="product-image w-1/3 mx-4 my-2 border">
					<img v-bind:src="image" class="object-contain h-50 w-full" alt="Image">
				</div>
	
				<div class="product-info ml-8 mt-8">
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
		</div>
		<review-tabs :reviews="reviews"></review-tabs>
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
			],
			reviews: []
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
	},
	mounted() {
		eventBus.$on('review-submitted', productReview => {
			this.reviews.push(productReview)
		})
	}
});

Vue.component('product-review', {
	template: `
		<form action="" class="border rounded mx-6 my-6 w-1/2 p-6" @submit.prevent="onSubmit">
			<div v-if="errors.length" class=" border rounded border-red-500 p-4 mb-2">
				<p class="text-red-500">Please correct the following error(s):</p>
				<ul class="list-disc ml-8">
					<li class="text-red-500" v-for="error in errors">{{ error}}</li>
				</ul>
			</div>
			<div>
				<label for="name">Name:</label>
				<input id="name" class="border rounded w-full px-2 py-1" v-model="name">
			</div>
			<div class="mt-2">
				<label for="review">Review:</label>
				<textarea id="review" class="border rounded w-full p-2 h-24" v-model="review"></textarea>
			</div>
			<div class="mt-2">
				<label for="rating">Rating:</label>
				<select v-model.number="rating" id="rating" class="border rounded text-black bg-white px-2 py-1 ml-2">
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
			</div>
			<button type="submit" class="border hover:border-gray-600 rounded w-full mt-2 py-2">Submit</button>
		</form>`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			this.errors = [];
			if (this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
				}
				eventBus.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null
			} else {
				if (!this.name) {
					this.errors.push("Name required")
				}
				if (!this.review) {
					this.errors.push("Review required")
				}
				if (!this.rating) {
					this.errors.push("Rating required")
				}
			}
		}
	}
});

Vue.component('review-tabs', {
	props: {
		reviews: {
			type: Array,
			required: true
		}
	},
	template: `
		<div class="mx-6 mt-6">
			<span class="tab cursor-pointer"
				:class="{ 'text-2xl': selectedTab === tab}"
				v-for="(tab, index) in tabs" :key="index"
				@click="selectedTab = tab">
				{{ tab }}
			</span>	
			
		
		<div class="mx-6 mt-6" v-show="selectedTab === 'Reviews'">
			<p v-if="!reviews.length">There are no reviews yet.</p>
			<ul class="ml-4">
				<li v-for="review in reviews" class="mt-2">
					<p>{{ review.review }}</p>
					<p>Rating: {{ review.rating }}</p>
					<p>By: {{ review.name }}</p>
				</li>
			</ul>
		</div>
		<product-review v-show="selectedTab === 'Make a Review'"></product-review>
			
		</div>	
	`,
	data() {
		return {
			tabs: ['Reviews', 'Make a Review'],
			selectedTab: 'Reviews'
		}
	}
});


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