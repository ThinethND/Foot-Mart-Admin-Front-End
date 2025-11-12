<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-12/12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Add Product</h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form @submit.prevent="addProduct">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Product Information
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="product-name"
                  >
                    Product Name
                  </label>
                  <input
                    id="product-name"
                    type="text"
                    v-model="product.name"
                    placeholder="Enter product name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="product-price"
                  >
                    Price
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    v-model.number="product.price"
                    placeholder="Enter price"
                    step="0.01"
                    min="0"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="product-image"
                  >
                    Image URL
                  </label>
                  <input
                    id="product-image"
                    type="url"
                    v-model="product.imageUrl"
                    placeholder="Enter image URL"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="product-description"
                  >
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    v-model="product.description"
                    placeholder="Enter product description"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3 mt-4">
                  <button
                    type="submit"
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '../../services/ProductService';

export default {
  components: {},

  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        imageUrl: ""
      }
    };
  },

  methods: {
    async addProduct() {
      try {
        await ProductService.createProduct(this.product);
        alert('Product added successfully!');
        // Reset form
        this.product = { 
          name: "", 
          price: "", 
          description: "", 
          imageUrl: "" 
        };
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product: ' + error.message);
      }
    }
  }
};
</script>