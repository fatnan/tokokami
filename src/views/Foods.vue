<template>
  <div>
    <Navbar />
    <div class="title mt-5 text-center">
      <h2>Daftar <strong>Makanan</strong></h2>
    </div>

    <!-- Search input -->
    <div class="row">
        <div class="col-md-4 ml-auto input-group mb-3">
        <input v-model="search" type="text" class="form-control" placeholder="Cari Makanan" @keyup="searchFood" />
        <div class="input-group-append">
            <span class="input-group-text" id="basic-addon1">
                <b-icon-search></b-icon-search>
            </span>
        </div>
        </div>
    </div>

    <!-- List Product -->
    <div class="row">
      <div class="col-md-4 mt-3" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layouts/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Foods",
  components: { Navbar, CardProduct },
  data() {
    return {
      products: [],
      search: ''
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    getProducts(search = null) {
        let url = "http://localhost:3000/products"

        if (search !== null) {
            url = "http://localhost:3000/products?q=" + this.search
        }

        axios
            .get(url)
            .then((res) => this.setProduct(res.data))
            .catch((err) => console.log(err));
    },
    searchFood () {
        this.getProducts(this.search)
    }
  },
  mounted() {
    this.getProducts();
  },
};
</script>
