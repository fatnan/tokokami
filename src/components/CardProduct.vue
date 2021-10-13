<template>
  <div class="card shadow rounded">
    <img :src="`assets/${product.gambar}`" class="card-img-top" style="width: 100%; height: 15rem;" alt="product.gambar" />
    <div class="card-body">
      <h5 class="card-title">{{ capitalizeFirstLetter(product.nama) }}</h5>
      <p class="card-text">
        Harga: {{ formatNumber(product.harga) }}
      </p>
      <router-link :to="`food/${product.id}`" class="btn btn-success"><b-icon-cart class="mr-2"></b-icon-cart>Pesan</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style>
</style>