<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                class="font-semibold text-lg"
                :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                All Products
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Products table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
                >
                  Product Name
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
                >
                  Price
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
                >
                  Image
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
                >
                  Description
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading state -->
              <tr v-if="product.length === 0">
                <td colspan="5" class="text-center py-4">
                  <span :class="[color === 'light' ? 'text-blueGray-500' : 'text-white']">
                    Loading products...
                  </span>
                </td>
              </tr>
              
              <!-- Dynamic product rows -->
              <tr v-for="p in product" :key="p.id">
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                >
                  <img
                    :src="p.imageUrl || 'https://via.placeholder.com/48'"
                    class="h-12 w-12 bg-white rounded-full border object-cover"
                    :alt="p.name"
                    @error="handleImageError"
                  />
                  <span
                    class="ml-3 font-bold"
                    :class="[
                      color === 'light' ? 'text-blueGray-600' : 'text-white',
                    ]"
                  >
                    {{ p.name }}
                  </span>
                </th>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  ${{ p.price ? p.price.toFixed(2) : '0.00' }} USD
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <a 
                    v-if="p.imageUrl" 
                    :href="p.imageUrl" 
                    target="_blank"
                    class="text-blue-500 hover:text-blue-700 underline"
                  >
                    View Image
                  </a>
                  <span v-else :class="[color === 'light' ? 'text-blueGray-400' : 'text-gray-300']">
                    No image
                  </span>
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <div class="max-w-xs truncate" :title="p.description">
                    {{ p.description || 'No description available' }}
                  </div>
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <button
                    @click="deleteProduct(p.id)"
                    class="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '../../services/ProductService';

export default {
  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },

  data() {
    return {
      product: []
    };
  },

  async created() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      try {
        const res = await ProductService.getAllProducts();
        this.product = res.data;
      } catch (error) {
        console.error("Error loading products:", error);
        alert("Failed to load products. Please try again.");
      }
    },

    async deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await ProductService.deleteProduct(id);
          this.loadProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        }
      }
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/48';
    }
  }
};
</script>