<template>
  <div class="home">
    <Navbar />
    <Hero />

    <div class="row mt-5">
      <div class="col-md-6">
        <h2>Best <strong>Foods</strong></h2>
      </div>
      <div class="col-md-6 text-right">
        <router-link to="/foods" class="btn btn-success"><b-icon-eye class="mr-2"></b-icon-eye> Lihat Semua</router-link>
      </div>
    </div>
    <!-- Card Product -->
    <div class="row mt-5 mb-3">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/layouts/Navbar.vue'
  import Hero from '@/components/Hero.vue'
  import CardProduct from '@/components/CardProduct.vue'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      Navbar,
      Hero,
      CardProduct
    },
    data() {
      return {
        products: []
      }
    },
    methods: {
      setProduct(data) {
        this.products = data
      },
      getProducts() {
        axios
          .get("http://localhost:3000/best-products")
          .then((res) => this.setProduct(res.data))
          .catch((err) => console.log(err))
      }
    },
    mounted() {
      this.getProducts()
    },
  }
</script>